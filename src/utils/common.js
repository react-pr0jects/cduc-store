export function formatPrice(price) {
    const result = price ? price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : ''
    return result
}