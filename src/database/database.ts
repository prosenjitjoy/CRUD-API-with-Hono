import { Database } from "arangojs"

export const db = new Database();

export async function openCollection(collectionName: string) {
    const col = db.collection(collectionName);
    const isExist = await col.exists();

    if (isExist) {
        console.log("Collection already exists")
    } else {
        console.log("Collection doesn't exist yet")
        await col.create()
        console.log("Collection created successfully")
    }

    return col
}
