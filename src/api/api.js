const URL = "https://test2.sionic.ru/api";

export const apiSionic = {
    async getCategories() {
        const res = await fetch(URL + '/Categories');
        const data = await res.json();
        return data;
    },
    async getProducts(idCategory, range, sort) {
        let s = range ? range[0] : 0;
        let q = range ? range[1] - 1 : 9;
        console.log(sort)
        const res = await fetch(URL + `/Products?filter={"category_id":${idCategory}}&range=[${s},${q}]&sort=["${sort[0]}","${sort[1]}"]`);
        
        const data = await res.json();
        return data;
    },
    async getImagesProduct(idProduct) {
        let allData = []
        let range = [0, 50];
        let data;
        do {
            const res = await fetch(URL + `/ProductImages?filter={"product_id":[${idProduct}]}&range=[${range}]`);
            data = await res.json();
            allData = allData.concat(data);
            range = [range[0] + 50, range[1] + 50];

        } while (data.length == 50);
        return allData;
    },
    async getProductVariations(idProduct) {
        let allData = []
        let range = [0, 50];
        let data;
        do {
            const res = await fetch(URL + `/ProductVariations?filter={"product_id":[${idProduct}]}&range=[${range}]`);
            data = await res.json();
            allData = allData.concat(data);
            range = [range[0] + 50, range[1] + 50];
        } while (data.length == 50);
        return allData;
    },
    async getProductVariationsId(id) {
        const res = await fetch(URL + `/ProductVariations/${id}`);
        const data = await res.json();
        data.quantity = 1;
        return data;
    },
    async getProductVariationProperties() {
        const res = await fetch(URL + `/ProductVariationProperties`);
        const data = await res.json();
        return data;
    },
    async getProductVariationPropertyListValues() {
        const res = await fetch(URL + `/ProductVariationPropertyListValues`);
        const data = await res.json();
        return data;
    },
    async getProductVariationPropertyValues(id) {
        const res = await fetch(URL + `/ProductVariationPropertyValues?filter={"product_variation_id":${id}}`);
        const data = await res.json();
        return data;
    },
    async getProductId(id) {
        const res = await fetch(URL + `/Products/${id}`);
        const data = await res.json();
        return data;
    }
}