'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { IMAGES } from '@/graphql/queries/image';
import { Image } from '@/interfaces/interfaces';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { storageUrl } from '../constants/constants';
import ButtonLoadMore from '@/components/button-load-more';

export default function Home() {
    // States
    const [images, setImages] = useState<Image[]>([]);
    const [page, setPage] = useState<number>(1);

    // Other hooks
    const router = useRouter();

    // Queries
    const [queryImages, { data, loading }] = useLazyQuery(IMAGES);

    const viewImage = (image: Image) => {
        router.push(`/view-image?image=${image.id}`);
    };

    const fetchImages = async () => {
        try {
            if (page === 1) {
                setPage(page + 1);
            }

            await queryImages({ variables: { page: page } });

            if (data) {
                setImages([...images, ...data.images]);
            }

            setPage(page + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [data]);

    return (
        <>
            <main className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                <Navbar />

                {loading && (
                    <div className="flex flex-wrap gap-2 lg:grid-cols-4">
                        <div
                            className={`w-[500px] lg:grow lg:w-[auto] h-[500px] animate-pulse cursor-pointer rounded-lg object-cover bg-gray-100`}
                        ></div>
                        <div
                            className={`w-[500px] lg:grow lg:w-[auto] h-[500px] animate-pulse cursor-pointer rounded-lg object-cover bg-gray-100`}
                        ></div>
                        <div
                            className={`w-[500px] lg:grow lg:w-[auto] h-[500px] animate-pulse cursor-pointer rounded-lg object-cover bg-gray-100`}
                        ></div>
                        <div
                            className={`w-[500px] lg:grow lg:w-[auto] h-[500px] animate-pulse cursor-pointer rounded-lg object-cover bg-gray-100`}
                        ></div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                    {images &&
                        images.map((image, index) => (
                            <div key={image.id}>
                                <img
                                    className='transition duration-300 ease-in-out hover:shadow-[0_35px_60px_-15px_#cc00ff69] w-[500px] h-[500px] cursor-pointer rounded-lg object-cover'
                                    src={storageUrl + image.filename}
                                    onClick={() => viewImage(image)}
                                />
                            </div>
                        ))}
                </div>

                {data && data.images.length !== 0 && <ButtonLoadMore handleClick={fetchImages} />}

                {images.length === 0 && !loading && (
                    <div className="mx-auto text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg">
                        There's nothing to show here
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
}
