"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  components: {
    MuiDataGrid: {
      defaultProps: {
        localeText: {
          Add: "createew",
          noRowsLabel: 'Sem resultados',
          noResultsOverlayLabel: 'Nenhum resultado encontrado.',
          // Density selector toolbar button text
          toolbarDensity: 'Densidade',
          toolbarDensityLabel: 'Densidade',
          toolbarDensityCompact: 'Compacto',
          toolbarDensityStandard: 'Padrão',
          toolbarDensityComfortable: 'Confortável',
          // Columns selector toolbar button text
          toolbarColumns: 'Colunas',
          toolbarColumnsLabel: 'Selecionar colunas',
          // Filters toolbar button text
          toolbarFilters: 'Filtros',
          toolbarFiltersLabel: 'Mostrar filtros',
          toolbarFiltersTooltipHide: 'Esconder filtros',
          toolbarFiltersTooltipShow: 'Mostrar filtros',
          toolbarFiltersTooltipActive: count => count !== 1 ? "".concat(count, " filtros ativos") : "".concat(count, " filtro ativo"),
          // Quick filter toolbar field
          toolbarQuickFilterPlaceholder: 'Pesquisar...',
          toolbarQuickFilterLabel: 'Pesquisar',
          toolbarQuickFilterDeleteIconLabel: 'Limpar',
          // Export selector toolbar button text
          toolbarExport: 'Exportar',
          toolbarExportLabel: 'Exportar',
          toolbarExportCSV: 'Baixar como CSV',
          toolbarExportPrint: 'Imprimir',
          toolbarExportExcel: 'Baixar como Excel',
          // Columns panel text
          columnsPanelTextFieldLabel: 'Encontrar coluna',
          columnsPanelTextFieldPlaceholder: 'Título da coluna',
          columnsPanelDragIconLabel: 'Reorganizar coluna',
          columnsPanelShowAllButton: 'Mostrar todas',
          columnsPanelHideAllButton: 'Esconder todas',
          // Filter panel text
          filterPanelAddFilter: 'Adicionar filtro',
          filterPanelRemoveAll: 'Remover todos',
          filterPanelDeleteIconLabel: 'Excluir',
          filterPanelLogicOperator: 'Operador lógico',
          filterPanelOperator: 'Operador',
          filterPanelOperatorAnd: 'E',
          filterPanelOperatorOr: 'Ou',
          filterPanelColumns: 'Colunas',
          filterPanelInputLabel: 'Valor',
          filterPanelInputPlaceholder: 'Valor do filtro',
          // Filter operators text
          filterOperatorContains: 'contém',
          filterOperatorEquals: 'é igual a',
          filterOperatorStartsWith: 'começa com',
          filterOperatorEndsWith: 'termina com',
          filterOperatorIs: 'é',
          filterOperatorNot: 'não é',
          filterOperatorAfter: 'é posterior a',
          filterOperatorOnOrAfter: 'é em ou depois de',
          filterOperatorBefore: 'é anterior a',
          filterOperatorOnOrBefore: 'é em ou antes de',
          filterOperatorIsEmpty: 'está vazio',
          filterOperatorIsNotEmpty: 'não está vazio',
          filterOperatorIsAnyOf: 'é algum de',
          'filterOperator=': '=',
          'filterOperator!=': '!=',
          'filterOperator>': '>',
          'filterOperator>=': '>=',
          'filterOperator<': '<',
          'filterOperator<=': '<=',
          // Header filter operators text
          headerFilterOperatorContains: 'Contém',
          headerFilterOperatorEquals: 'É igual a',
          headerFilterOperatorStartsWith: 'Começa com',
          headerFilterOperatorEndsWith: 'Termina com',
          headerFilterOperatorIs: 'É',
          headerFilterOperatorNot: 'Não é',
          headerFilterOperatorAfter: 'É depois de',
          headerFilterOperatorOnOrAfter: 'É em ou depois de',
          headerFilterOperatorBefore: 'É antes de',
          headerFilterOperatorOnOrBefore: 'É em ou antes de',
          headerFilterOperatorIsEmpty: 'Está vazio',
          headerFilterOperatorIsNotEmpty: 'Não está vazio',
          headerFilterOperatorIsAnyOf: 'É algum de',
          'headerFilterOperator=': 'É igual a',
          'headerFilterOperator!=': 'Não é igual a',
          'headerFilterOperator>': 'Maior que',
          'headerFilterOperator>=': 'Maior ou igual a',
          'headerFilterOperator<': 'Menor que',
          'headerFilterOperator<=': 'Menor ou igual a',
          // Filter values text
          filterValueAny: 'qualquer',
          filterValueTrue: 'verdadeiro',
          filterValueFalse: 'falso',
          // Column menu text
          columnMenuLabel: 'Menu',
          columnMenuShowColumns: 'Mostrar colunas',
          columnMenuManageColumns: 'Gerenciar colunas',
          columnMenuFilter: 'Filtro',
          columnMenuHideColumn: 'Esconder coluna',
          columnMenuUnsort: 'Desfazer ordenação',
          columnMenuSortAsc: 'Ordenar por ASC',
          columnMenuSortDesc: 'Ordenar por DESC',
          // Column header text
          columnHeaderFiltersTooltipActive: count => count !== 1 ? "".concat(count, " filtros ativos") : "".concat(count, " filtro ativo"),
          columnHeaderFiltersLabel: 'Mostrar filtros',
          columnHeaderSortIconLabel: 'Ordenar',
          // Rows selected footer text
          footerRowSelected: count => count !== 1 ? "".concat(count.toLocaleString(), " linhas selecionadas") : "".concat(count.toLocaleString(), " linha selecionada"),
          // Total row amount footer text
          footerTotalRows: 'Total de linhas:',
          // Total visible row amount footer text
          footerTotalVisibleRows: (visibleCount, totalCount) => "".concat(visibleCount.toLocaleString(), " de ").concat(totalCount.toLocaleString()),
          // Checkbox selection text
          checkboxSelectionHeaderName: 'Seleção de caixa de seleção',
          checkboxSelectionSelectAllRows: 'Selecionar todas as linhas',
          checkboxSelectionUnselectAllRows: 'Desselecionar todas as linhas',
          checkboxSelectionSelectRow: 'Selecionar linha',
          checkboxSelectionUnselectRow: 'Desselecionar linha',
          // Boolean cell text
          booleanCellTrueLabel: 'sim',
          booleanCellFalseLabel: 'não',
          // Actions cell more text
          actionsCellMore: 'mais',
          // Column pinning text
          pinToLeft: 'Fixar à esquerda',
          pinToRight: 'Fixar à direita',
          unpin: 'Desafixar',
          // Tree Data
          treeDataGroupingHeaderName: 'Agrupar',
          treeDataExpand: 'ver filhos',
          treeDataCollapse: 'esconder filhos',
          // Grouping columns
          groupingColumnHeaderName: 'Agrupar',
          groupColumn: name => "Agrupar por ".concat(name),
          unGroupColumn: name => "Parar de agrupar por ".concat(name),
          // Master/detail
          detailPanelToggle: 'Alternar painel de detalhes',
          expandDetailPanel: 'Expandir',
          collapseDetailPanel: 'Recolher',
          // Used core components translation keys
          MuiTablePagination: {},
          // Row reordering text
          rowReorderingHeaderName: 'Reorganização de linhas',
          // Aggregation
          aggregationMenuItemHeader: 'Agregação',
          aggregationFunctionLabelSum: 'soma',
          aggregationFunctionLabelAvg: 'média',
          aggregationFunctionLabelMin: 'mínimo',
          aggregationFunctionLabelMax: 'máximo',
          aggregationFunctionLabelSize: 'tamanho',
          //footer
          Jumptopage: 'Ir para a página',
          Go: 'Ir',
          InthisspacewewillsoonbringyouadashboardofmainoverviewKPIsforeasyaccess: 'Neste espaço em breve traremos para você um dashboard com os principais KPIs de visão geral para fácil acesso',
          Pages: 'Páginas',
          MuiTablePagination: {
            labelRowsPerPage: 'Linhas por página'
          }
        }
      }
    }
  }
};