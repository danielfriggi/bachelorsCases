import { useState } from "react"
import "./ApiSort.css"

type ApiItem = {
  index: number
  name: string
  url: string
  method: string
  host: string
  duplicado: boolean
  referencia?: string
  tamanho?: number
  retorno?: string
}

export default function ApiSort() {
  const [apis, setApis] = useState<ApiItem[]>([])
  const [search, setSearch] = useState("")
  const [groupBy, setGroupBy] = useState("none")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("")

  function processarArquivo(file: File) {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        const items = json.item || []
        const seen = new Map<string, string>()

        const lista: ApiItem[] = items.map((api: any, index: number) => {
          const url = api.request.url.raw || ""
          const host = api.request.url.host ? api.request.url.host.join(".") : ""
          const method = api.request.method
          const name = api.name
          const key = `${method}_${url}`

          let duplicado = false
          let referencia = ""

          if (seen.has(key)) {
            duplicado = true
            referencia = seen.get(key)!
          } else {
            seen.set(key, `#${index + 1} - ${name}`)
          }

          return { index: index + 1, name, url, method, host, duplicado, referencia }
        })

        // Busca tamanho e retorno
        lista.forEach((api, i) => {
          fetch(api.url, { method: api.method })
            .then(async res => {
              const blob = await res.clone().blob()
              const text = await res.text()
              lista[i].tamanho = blob.size
              lista[i].retorno = text
              setApis([...lista])
            })
            .catch(() => {
              lista[i].tamanho = -1
              lista[i].retorno = "Erro"
              setApis([...lista])
            })
        })

        setApis(lista)
      } catch (err) {
        alert("Erro ao ler JSON")
      }
    }
    reader.readAsText(file)
  }

  // Agrupamento
  const grouped: Record<string, ApiItem[]> = {}
  const filtered = apis.filter(api =>
    [api.name, api.url, api.method].join(" ").toLowerCase().includes(search.toLowerCase())
  )
  if (groupBy === "none") {
    grouped["Todos"] = filtered
  } else if (groupBy === "unique") {
    grouped["Únicas"] = filtered.filter(a => !a.duplicado)
    grouped["Duplicadas"] = filtered.filter(a => a.duplicado)
  } else {
    filtered.forEach(api => {
      const key = groupBy === "host" ? api.host : groupBy === "method" ? api.method : api.name
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(api)
    })
  }

  function abrirModal(retorno?: string) {
    setModalContent(retorno || "")
    setModalOpen(true)
  }

  function exportarCSV() {
    if (!apis.length) return alert("Nenhuma API para exportar")
    let csv = "Indice,Nome,URL,Método,Duplicado,Tamanho\n"
    apis.forEach(api => {
      csv += [
        api.index,
        api.name,
        api.url,
        api.method,
        api.duplicado ? `Sim (${api.referencia})` : "Não",
        api.tamanho ?? ""
      ].join(",") + "\n"
    })

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "apis_exportadas.csv"
    link.click()
  }

  return (
    <div className="organizador">
      <div className="header">
        <h1>Organizador de APIs</h1>
        <a href="/manual_apisort.pdf" target="_blank" rel="noreferrer">
          <button>Manual</button>
        </a>
      </div>

      <input
        type="file"
        accept=".json"
        onChange={(e) => e.target.files?.[0] && processarArquivo(e.target.files[0])}
      />

      <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
        <option value="none">Sem agrupamento</option>
        <option value="host">Domínio</option>
        <option value="method">Método</option>
        <option value="unique">Únicas / Duplicadas</option>
      </select>

      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <button onClick={exportarCSV}>Exportar CSV</button>

      {Object.keys(grouped).map(grupo => (
        <div key={grupo}>
          <h2>{grupo} ({grouped[grupo].length})</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Método</th>
                <th>URL</th>
                <th>Duplicado</th>
                <th>Tamanho</th>
                <th>Retorno</th>
              </tr>
            </thead>
            <tbody>
              {grouped[grupo].map((api, i) => (
                <tr key={i} className={api.duplicado ? "duplicado" : ""}>
                  <td>{api.index}</td>
                  <td>{api.name}</td>
                  <td>{api.method}</td>
                  <td>{api.url}</td>
                  <td>{api.duplicado ? `Sim (${api.referencia})` : "Não"}</td>
                  <td>{api.tamanho ?? "..."}</td>
                  <td
                    style={{ cursor: "pointer", whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                    onClick={() => abrirModal(api.retorno || "Sem conteúdo")}
                    >
                    {api.retorno
                        ? api.retorno.length > 100
                        ? api.retorno.slice(0, 100) + "..."
                        : api.retorno
                        : "..."}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {modalOpen && (
        <div className="modal" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalOpen(false)}>X</button>
            <pre>{modalContent}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
