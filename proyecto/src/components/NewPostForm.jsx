

const NewPostForm = () => {


    return (
        <form>
            <input className=""
                type="text"
                name="title"
                id="title"
                placeholder="Titulo del Post"
            />
            <input className=""
                type="text"
                name="description"
                id="description"
                placeholder="Descripcion del Post"
            />
            <input className=""
                type="text"
                name="image"
                id="image"
                placeholder="Ingrese el URL de la imagen"
            />
        </form>
    );
};

export default NewPostForm;