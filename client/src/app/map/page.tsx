// pages/index.js 또는 components/MyMapComponent.js

'use client';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const GoogleMapsComponent = () => {
    const dispatch = useDispatch();
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedSpot, setSelectedSpot] = useState<{ title: string; lat: number; lng: number } | null>(null);
    const [clickedLocation, setClickedLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        // GoogleMap.js 스크립트 로드 기다리기
        window.initMap = initMap;

        // 스크립트가 이미 페이지에 존재하는지 확인
        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
            script.defer = true;
            document.head.appendChild(script);
        } else {
            initMap();
        }

        return () => {
            window.initMap = null;
        };
    }, []);

    // 지도 초기화
    const initMap = () => {
        const spots = [
            {
                title: '해목',
                lat: 37.5214971,
                lng: 127.0383103,
            },
            {
                title: '남산',
                lat: 37.550925,
                lng: 126.990945,
            },
        ];

        if (window.google && !map) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                if (mapRef.current) {
                    const map = new window.google.maps.Map(mapRef.current, {
                        center: currentLocation,
                        zoom: 13,
                    });

                    // 지도 클릭 이벤트 리스너 추가
                    map.addListener('click', async (event: google.maps.MapMouseEvent) => {
                        console.log(event, '<event');
                        if (event.placeId) {
                            await axios
                                .get(
                                    `https://places.googleapis.com/v1/places/${event.placeId}?fields=id,photos,displayName,formattedAddress,location,types,rating,userRatingCount,regularOpeningHours,websiteUri&languageCode=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
                                )
                                .then((res) => {
                                    const detailData = res.data;

                                    dispatch({
                                        type: 'OPEN_POPUP_MODAL',
                                        title: `${detailData.displayName.text}`,
                                        data: { ...detailData },
                                    });
                                });
                        }
                    });

                    spots.forEach((spot) => {
                        const marker = new window.google.maps.Marker({
                            position: new google.maps.LatLng(spot.lat, spot.lng),
                            map: map,
                            title: spot.title,
                            icon: 'https://maps.google.com/mapfiles/kml/shapes/' + 'dining_maps.png',
                        });

                        marker.addListener('click', () => {
                            setSelectedSpot(spot);
                        });
                    });

                    // new window.google.maps.Circle({
                    //     strokeColor: '#FF0000',
                    //     strokeOpacity: 0.8,
                    //     strokeWeight: 2,
                    //     fillColor: '#FF0000',
                    //     fillOpacity: 0.35,
                    //     map: map,
                    //     center: currentLocation,
                    //     radius: 2000, // 2km
                    // });

                    setMap(map);
                }
            });
        }
    };

    return <div id="map" className="content two out" ref={mapRef} style={{ height: '100vh', width: '100%' }} />;
};

export default GoogleMapsComponent;
