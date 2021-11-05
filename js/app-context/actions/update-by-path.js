

export default function actionUpdatePropertyByPath(newState, path, value) {
    setObjectProperty(newState, path, value);
}



// https://dirask.com/posts/JavaScript-set-object-property-by-path-DNKXOp
const setObjectProperty = (object, path, value) => {
    const parts = path.split('.');
    const limit = parts.length - 1;
    for (let i = 0; i < limit; ++i) {
        const key = parts[i];
        object = object[key] ?? (object[key] = { });
    }
    const key = parts[limit];
    object[key] = value;
};
