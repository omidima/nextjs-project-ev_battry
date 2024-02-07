
export async function GET() {
    return Response.json([{
        id: "1",
        name: "X",
        model: "2021",
        brand: "tesla",
        battry_capacity: 100,
        remaining_warrant: 60000,
        remaining_warrant_month: 6,
        nominal: 80,
    }, {
        id: "2",
        name: "T",
        model: "2023",
        brand: "tesla",
        battry_capacity: 100,
        remaining_warrant: 70000,
        remaining_warrant_month: 6,
        nominal: 1000,
    },{
        id: "3",
        name: "EQB 250+",
        model: "2023",
        brand: "Mercedes-Benz",
        battry_capacity: 70,
        remaining_warrant: 100000,
        remaining_warrant_month: 8,
        nominal: 100,
    }])
}