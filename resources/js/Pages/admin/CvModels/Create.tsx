import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";

const CvModelCreate = () => {
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        price: '',
        previewImage: null,
    });

    const [preview, setPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('previewImage', data.previewImage);

        post(route('CvModels.store'), formData);
    };

    const handleFileChange = (e) => {
        setData('previewImage', e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
                {errors.name && <span className="text-danger">{errors.name}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    required
                ></textarea>
                {errors.description && <span className="text-danger">{errors.description}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    required
                />
                {errors.price && <span className="text-danger">{errors.price}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="previewImage">Preview Image</label>
                <input
                    type="file"
                    className="form-control-file"
                    id="previewImage"
                    onChange={handleFileChange}
                    required
                />
                {errors.previewImage && <span className="text-danger">{errors.previewImage}</span>}
                {preview && <img src={preview} alt="Preview" className="mt-3" width="200" />}
            </div>
            <Button type="submit" className="btn btn-primary mt-3">
                Create
            </Button>
        </form>
    );
};

export default CvModelCreate;
