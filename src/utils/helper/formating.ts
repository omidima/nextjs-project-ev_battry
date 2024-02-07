export function formatPrice(price: string) {
    const numericPrice = parseFloat(price);

    if (isNaN(numericPrice)) {
        console.error("قیمت ورودی معتبر نیست.");
        return;
    }
    
    const formattedPrice = numericPrice.toLocaleString('en-US');

    return formattedPrice
}