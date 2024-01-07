import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import download from "/images/download.svg";
import maximize from "/images/maximize.svg";
import loading from "/assets/loading-anim.gif";
import Modal from "../../components/modal-window/Modal";

const Photo = () => {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const accessKey = import.meta.env.VITE_ACCESS_KEY;
    const [style, setStyle] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        let localVals = localStorage.getItem("likedPhotos")
        let array = localVals.split(",");
        
        for(let i = 0; i < array.length; i++){
            if(array[i].includes(id)){
                setIsLiked(true);
            console.log('set to true')
            }
        }
        fetchPhoto();
        
    }, []);

    const fetchPhoto = async () => {
        try {
            setLoading(true);
            const apiUrl = `https://api.unsplash.com/photos/${id}/?client_id=${accessKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            setPhoto(data);
            setStyle({
                backgroundImage: `url(${data.urls.regular})`,
                backgroundSize: "cover",
            });
        } catch (error) {
            console.error("Error fetching photo from Unsplash by id:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            setLoading(true);
            const response = await fetch(photo.urls.full);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `photo_${id}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading photo:", error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleLike = () => {
        console.log("liked");
        setIsLiked((prevIsLiked) => !prevIsLiked);
        let likedPhotos = JSON.parse(localStorage.getItem("likedPhotos")) || [];

        const isLiked = likedPhotos.includes(id);

        if (!isLiked) {
            likedPhotos.push(id);
        } else {
            const updatedLikedPhotos = likedPhotos.filter(
                (photoId) => photoId !== id
            );
            likedPhotos = updatedLikedPhotos;
        }

        localStorage.setItem("likedPhotos", JSON.stringify(likedPhotos));
    };

    return (
        <div className="w-full flex flex-col items-center my-8">
            {photo && !isLoading ? (
                <div className="w-full flex flex-col justify-center items-center">
                    <div
                        className="hidden md:block absolute top-0 -z-20 w-full h-[70vh]"
                        style={style}
                    ></div>
                    <div className="hidden md:block  absolute top-0 -z-10 w-full h-[70vh] bg-black opacity-50"></div>
                    <div className="flex items-center justify-between max-w-[67.5rem] w-4/5 mb-8">
                        <div className="flex items-center space-x-3">
                            <img
                                src={photo.user.profile_image.large}
                                width={48}
                                height={48}
                                className="rounded-md"
                            />
                            <div className="leading-5">
                                <p className="font-bold text-[18px] md:text-white">
                                    {photo.user.name}
                                </p>
                                <p className="font-extralight text-gray-400 text-[16px] md:text-gray-200">
                                    @{photo.user.instagram_username}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                // className="flex rounded-lg justify-center items-center p-3 shadow-md bg-white"
                                className={`flex rounded-lg justify-center items-center p-3 shadow-md bg-white space-x-2`}
                                onClick={handleLike}
                            >
                                <svg
                                    width="25"
                                    height="23"
                                    viewBox="0 0 25 23"
                                    fill="black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-transform duration-300 transform ${isLiked ? 'scale-110' : 'scale-100'}`}
                                >
                                    <path
                                        d="M18.4896 0C15.7166 0 13.4262 2.57568 12.5 3.79131C11.5738 2.57568 9.28345 0 6.5104 0C2.92056 0 0 3.30049 0 7.35679C0 9.56982 0.878418 11.6323 2.41597 13.0437C2.43833 13.0824 2.46582 13.118 2.49785 13.15L12.1323 22.7646C12.234 22.8658 12.3667 22.9167 12.5 22.9167C12.6333 22.9167 12.7665 22.8658 12.8683 22.7641L22.8231 12.8128L22.9258 12.7131C23.0072 12.6363 23.0876 12.5585 23.1776 12.4588C23.2152 12.4217 23.2462 12.38 23.2702 12.3347C24.3866 10.9675 25 9.2041 25 7.35679C25 3.30049 22.0795 0 18.4896 0ZM22.4035 11.7488C22.3892 11.7656 22.376 11.7833 22.3643 11.8017C22.3155 11.8576 22.2621 11.9069 22.2092 11.9573L12.4995 21.6599L3.35288 12.5315C3.32339 12.4735 3.28218 12.4207 3.23184 12.3764C1.8397 11.1608 1.04165 9.33125 1.04165 7.35679C1.04165 3.87471 3.49478 1.0417 6.5104 1.0417C9.49199 1.0417 12.0366 4.93066 12.0621 4.96982C12.2543 5.26685 12.7457 5.26685 12.9379 4.96982C12.9634 4.93066 15.508 1.0417 18.4896 1.0417C21.5052 1.0417 23.9583 3.87476 23.9583 7.35679C23.9583 8.99761 23.406 10.5576 22.4035 11.7488Z"
                                        fill={`${isLiked ? 'red' : 'black'}`}
                                    />
                                </svg>
                            </button>
                            <button
                                className="flex rounded-lg justify-center items-center p-3 shadow-md bg-yellow-300 space-x-2"
                                onClick={handleDownload}
                            >
                                <img
                                    src={download}
                                    width={25}
                                    height={22}
                                    alt="download"
                                />
                                <p className="hidden md:block">Download</p>
                            </button>
                        </div>
                    </div>
                    <div className="relative w-4/5 xl:w-auto flex justify-center h-[450px]">
                        <button onClick={openModal}>
                            <img
                                className="absolute bottom-5 right-5"
                                src={maximize}
                                alt="max"
                            />
                        </button>

                        <img
                            className="rounded-xl object-cover"
                            src={photo.urls.regular}
                            height={227}
                            alt="photo"
                        />
                    </div>

                    {showModal && (
                        <Modal
                            imageUrl={photo.urls.full}
                            onClose={closeModal}
                        />
                    )}
                </div>
            ) : (
                <div>
                    {!isLoading ? (
                        "Loading"
                    ) : (
                        <div className="flex flex-col items-center">
                            <p className="text-center">Loading, please wait!</p>
                            <p className="text-center">It will take a few seconds</p>
                            <img src={loading} alt="loading" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Photo;
