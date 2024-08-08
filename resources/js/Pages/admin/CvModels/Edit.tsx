import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";

const CvModelEdit = ({ cvModel }) => {
    const { data, setData, put, errors } = useForm({
        name: cvModel.name,
        description: cvModel.description,
        price: cvModel.price,
        previewImage: null,
    });

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        setPreview(`/storage/${cvModel.previewImagePath}`);
    }, [cvModel]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('previewImage', data.previewImage);

        put(route('CvModels.update', cvModel.id), formData);
    };

    const handleFileChange = (e) => {
        setData('previewImage', e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">

