const EntrySchema = {
    name: 'Entry',
    primaryKey: 'id',
    properties: {
        id: 'string',
        idEntry:'string',
        amount: 'double',
        qty:'double',
        discount:'double',
        totalAmount:'double',
        discountedValue:'double',
        totalAmountLiq:'double',
        paymentMode:'string',
        description:'string',
        entryAt: 'date',
        payAt:'date',
        address:'string?',
        client:'string',
        isInit: 'bool',
        seller:'Seller',
        category:'Category'
    }
}

export default EntrySchema