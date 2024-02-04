export const routesColumns = [
  {
    headerName: 'Имя',
    field: 'Name',
    flex: 1
  },
  {
    headerName: 'Кол-во остановок',
    field: 'Stops.length',
    flex: 1
  }
]

export const stopsColumns = [
  {
    headerName: 'Имя',
    field: 'Name',
    flex: 1
  },
  {
    headerName: 'Кол-во маршрутов',
    field: 'routesId.length',
    flex: 1
  },
  {
    headerName: ' Направление (прямое/обратное)',
    field: 'Forward',
    valueGetter: (val) => val.data.Forward ? 'прямое' : 'обратное',
    flex: 1
  }
]

export const tableColumnsConf = {
  routesColumns,
  stopsColumns
}

export const btnList = [
  { name: 'Маршруты', value: 'routes' },
  { name: 'Остановки', value: 'stops' }
]
