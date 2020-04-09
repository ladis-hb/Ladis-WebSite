type dir = "support" | "products"

export const paresLink = (Dir: dir) => {
    const date = new Date()
    const datePares = date.toLocaleDateString("zh");
    const link = `/${Dir}/${datePares + date.getSeconds()}`;
    return {
        date, datePares, link
    }
}