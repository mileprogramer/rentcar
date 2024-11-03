import dayjs from "dayjs";

export function formatPrice(price){
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(price);
}

export function sumAllRents(data){
    let firstRentedValue = calculateTotalPrice(data, false);
    let total = data.extended_rents.reduce((totalPriceForNow, currentData) => {
        return totalPriceForNow + calculateTotalPrice(currentData, false);
    }, firstRentedValue);
    return formatPrice(total);
}

export function calculateTotalPrice(data, withFormat = true){
    if(withFormat){
        return formatPrice(
            calculate(data)
        );
    }

    return calculate(data);

    function calculate(data){
        const totalDays = dayjs(data.return_date, "DD/MM/YYYY").diff(dayjs(data.start_date, "DD/MM/YYYY"), 'days');
        const totalPrice = data.price_per_day * totalDays;
        const discountedPrice = totalPrice - (totalPrice * (data.discount / 100));
        return discountedPrice;
    }
}

export class HandleInput{

    constructor(setData, data){
        this.setData = setData;
        this.data = data;

        return this.handle;
    }

    handle = (event) => {
        const { name, value } = event.target;
        this.setData({
            ...this.data,
            [name]: value
        });
    }

}