const SalesPeriodSchema = {
    name:'Period',
    primaryKey:'id',
    properties: {
        id: 'string',
        initialDate:'date',
        finalDate:'date',
        entries:'Entry[]'
    }
}

export default SalesPeriodSchema