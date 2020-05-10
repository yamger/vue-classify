
const storage = sessionStorage;
export const set = (key, value) => {
    storage.setItem(key, value);
}
export const get = (key) => {
    return storage.getItem(key);
}
export const clean = () => {
    storage.clear();
}
export const remove = (key) => {
    storage.removeItem(key);
}
