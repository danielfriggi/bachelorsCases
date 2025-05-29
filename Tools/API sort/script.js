 let csvData = [];
    let elementosTabela = [];
    const retornoCompletoMap = {};
    document.getElementById('groupBy').addEventListener('change', processarArquivo);
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('btnProcessar').addEventListener('click', processarArquivo);
      document.getElementById('btnExportar').addEventListener('click', exportarCSV);
      document.getElementById('search')?.addEventListener('input', filtrarApis);
      document.getElementById('btnFecharModal')?.addEventListener('click', fecharModal);
    });

    function processarArquivo() {
      const fileInput = document.getElementById('fileInput');
      const groupBy = document.getElementById('groupBy').value;
      const resultado = document.getElementById('resultado');
      resultado.innerHTML = '';
      csvData = [];
      elementosTabela = [];
      Object.keys(retornoCompletoMap).forEach(key => delete retornoCompletoMap[key]);

      if (!fileInput.files.length) return alert('Selecione um arquivo JSON');

      const reader = new FileReader();
      reader.onload = async function(event) {
        try {
          const json = JSON.parse(event.target.result);
          let apis = json.item || [];


          const seen = new Map();


          apis = apis.map((api, index) => {
            const url = api.request.url.raw || '';
            const host = api.request.url.host ? api.request.url.host.join('.') : '';
            const method = api.request.method;
            const name = api.name;
            const key = `${method}_${url}`;

            let duplicado = false;
            let referencia = '';

            if (seen.has(key)) {
              duplicado = true;
              referencia = seen.get(key);
            } else {
              seen.set(key, `#${index + 1} - ${name}`);
            }

            return { url, host, method, name, index: index + 1, duplicado, referencia };
          });

          let agrupado = {};

          if (groupBy === 'none') {
            agrupado['Todos'] = apis;
          } else if (groupBy === 'unique') {
            agrupado['Únicas'] = apis.filter(api => !api.duplicado);
            agrupado['Duplicadas'] = apis.filter(api => api.duplicado);
          } else {
            agrupado = {};
            for (let api of apis) {
              const chave = groupBy === 'host' ? api.host : groupBy === 'method' ? api.method : api.name;
              if (!agrupado[chave]) agrupado[chave] = [];
              agrupado[chave].push(api);
            }
          }

          for (const grupo in agrupado) {
            const apisGrupo = agrupado[grupo];
            resultado.innerHTML += `<h2 class="grupo-title" data-grupo="${grupo}" style="cursor:pointer">
  <span class="collapse-icon" id="icon-${grupo}">▼</span> ${grupo} (${apisGrupo.length})
</h2>`;
            resultado.innerHTML += `
              <table class="api-table" id="table-${grupo}">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th style="cursor:pointer" onclick="ordenarTabela('${grupo}', 3)">Método ⬍</th>
                    <th>URL</th>
                    <th>Duplicado</th>
                    <th style="cursor:pointer" onclick="ordenarTabela('${grupo}', 5)">Tamanho ⬍</th>
                    <th>Retorno</th>
                  </tr>
                </thead>
                <tbody id="tbody-${grupo}">
                  ${apisGrupo.map((api, i) => {
                    const rowId = `row-${grupo}-${i}`;
                    const duplicatedClass = api.duplicado ? 'duplicated' : '';
                    return `
                      <tr id="${rowId}" class="${duplicatedClass}" data-search="${[api.name, api.url, api.method].join(' ').toLowerCase()}">
                        <td>${api.index}</td>
                        <td>${api.name}</td>
                        <td>${api.method}</td>
                        <td>${api.url}</td>
                        <td>${api.duplicado ? `Sim (ref: ${api.referencia})` : 'Não'}</td>
                        <td id="size-${grupo}-${i}">Carregando...</td>
                        <td id="retorno-${grupo}-${i}">...</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            `;

            apisGrupo.forEach((api, i) => {
              fetch(api.url, { method: api.method }).then(async res => {
                const blob = await res.clone().blob();
                const text = await res.text();

                document.getElementById(`size-${grupo}-${i}`).textContent = blob.size + ' bytes';

                retornoCompletoMap[`${grupo}-${i}`] = text;

                const retornoLimitado = text.length > 300 ? text.slice(0, 300) + '...' : text;
                document.getElementById(`retorno-${grupo}-${i}`).innerHTML = `
                  <span>${retornoLimitado}</span>
                  ${text.length > 300 ? `<button data-ver-mais data-index="${i}" data-grupo="${grupo}">Ver mais</button>` : ''}
                `;

                csvData.push([
                  api.index,
                  api.name,
                  api.url,
                  api.method,
                  api.duplicado ? `Sim (ref: ${api.referencia})` : 'Não',
                  blob.size
                ]);

              }).catch(() => {
                document.getElementById(`size-${grupo}-${i}`).textContent = 'Erro';
                document.getElementById(`retorno-${grupo}-${i}`).textContent = 'Erro';
                csvData.push([
                  api.index,
                  api.name,
                  api.url,
                  api.method,
                  api.duplicado ? `Sim (ref: ${api.referencia})` : 'Não',
                  'Erro',
                  'Erro'
                ]);
              });

              elementosTabela.push(`row-${grupo}-${i}`);
            });
          }
        } catch (e) {
          alert('Erro ao ler JSON: ' + e.message);
        }
      };

      reader.readAsText(fileInput.files[0]);
    }

    function filtrarApis() {
      const termo = document.getElementById('search').value.toLowerCase();
      elementosTabela.forEach(id => {
        const row = document.getElementById(id);
        if (!row) return;
        const conteudo = row.getAttribute('data-search');
        row.style.display = conteudo.includes(termo) ? '' : 'none';
      });
    }

    function exportarCSV() {
      let csv = 'Indice,Nome,URL,Método,Duplicado,Tamanho\n';
      csvData.forEach(linha => {
        csv += linha.join(',') + '\n';
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'apis_exportadas.csv';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function abrirModal(index, grupo) {
      const modal = document.getElementById('modalRetorno');
      const modalContent = document.getElementById('modalContent');
      modalContent.textContent = retornoCompletoMap[`${grupo}-${index}`] || 'Sem conteúdo.';
      modal.classList.remove('hidden');
    }

    function fecharModal() {
      const modal = document.getElementById('modalRetorno');
      modal.classList.add('hidden');
    }

    function toggleCollapse(grupo) {
      const tabela = document.getElementById(`table-${grupo}`);
      const icon = document.getElementById(`icon-${grupo}`);
      if (!tabela) return;
      if (tabela.style.display === 'none') {
        tabela.style.display = 'table';
        icon.textContent = '▼';
      } else {
        tabela.style.display = 'none';
        icon.textContent = '►';
      }
    }


    function ordenarTabela(grupo, colIndex) {
      const tabela = document.getElementById(`table-${grupo}`);
      if (!tabela) return;
      const tbody = tabela.tBodies[0];
      const rows = Array.from(tbody.rows);


      let asc = tabela.getAttribute('data-sort-dir') !== 'asc';
      tabela.setAttribute('data-sort-dir', asc ? 'asc' : 'desc');

      rows.sort((a, b) => {
        let valA = a.cells[colIndex].textContent.trim();
        let valB = b.cells[colIndex].textContent.trim();


        const numA = parseFloat(valA.replace(/[^\d.-]/g, ''));
        const numB = parseFloat(valB.replace(/[^\d.-]/g, ''));

        if (!isNaN(numA) && !isNaN(numB)) {
          valA = numA;
          valB = numB;
        }

        if (valA < valB) return asc ? -1 : 1;
        if (valA > valB) return asc ? 1 : -1;
        return 0;
      });


      rows.forEach(row => tbody.appendChild(row));

      document.getElementById('resultado').addEventListener('click', (e) => {
  const collapseEl = e.target.closest('.grupo-title');
  if (collapseEl) {
    const grupo = collapseEl.getAttribute('data-grupo');
    toggleCollapse(grupo);
  }

  const verMaisBtn = e.target.closest('[data-ver-mais]');
  if (verMaisBtn) {
    const index = verMaisBtn.getAttribute('data-index');
    const grupo = verMaisBtn.getAttribute('data-grupo');
    abrirModal(index, grupo);
  }
});
    }