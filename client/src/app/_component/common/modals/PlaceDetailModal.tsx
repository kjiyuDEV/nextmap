/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import moment from 'moment';
import { useSelector } from 'react-redux';
import CONST from '../../asset/config/constant';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import startYellow from '../../asset/img/star.png';
import startDark from '../../asset/img/starBackground.png';

const PlaceDetailModal = () => {
    const { modal } = useSelector((state: any) => {
        console.log(state);
        return {
            modal: state.modals.modal,
        };
    });
    const { datas } = modal;
    const [type, setType] = useState('');
    const [imgUrls, setImgUrls] = useState([]);
    const ratingStar = datas.rating * 20;
    useEffect(() => {
        console.log('????');
        // 해당 장소 이미지 url 저장
        let photoArr = [];
        if (datas.photos) {
            datas.photos.map(async (v, i) => {
                await axios.get(`https://places.googleapis.com/v1/${v.name}/media?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&maxHeightPx=400&maxWidthPx=400`).then((photos) => {
                    console.log(photos.request, '<photos');
                    if (photos.request.responseURL) {
                        console.log('이거찍힘');
                        console.log(photos.request.responseURL);
                        photoArr.push(photos.request.responseURL);
                    }
                });
                setImgUrls(photoArr);
            });
        } else {
            setImgUrls(false);
        }

        const arr = [];
        datas.types.map((v) => {
            if (CONST.CATEGORY_TO_KOR[v]) {
                arr.push((arr.length >= 1 ? ',' : '') + CONST.CATEGORY_TO_KOR[v]);
            }
        });
        setType(arr);
    }, [modal, datas.photos]);

    console.log(type);
    console.log(moment().day());
    return (
        <div className="content-wrap">
            <div className="rate-type">
                <div style={{ width: '100px' }}>
                    <div className="starBox" style={{ width: ratingStar }}>
                        <Image className="pointOfStar" alt="별" src={startYellow} width={100} height={45} />
                    </div>
                    <Image className="backgroundStar" alt="별" src={startDark} width={100} height={45} />
                </div>
                <div className="rating">
                    ({datas.rating}) {datas.userRatingCount > 0 ? `${datas.userRatingCount}개` : ''}
                </div>
            </div>

            <div className="type">{type}</div>
            <div className="address">{datas.formattedAddress}</div>
            <ImageList sx={{ width: '100%', height: '17rem' }} cols={2} rowHeight={164}>
                {!imgUrls ? (
                    <img src="https://blogjiyu.s3.ap-northeast-2.amazonaws.com/upload//%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7+2024-05-25+164551.png" />
                ) : (
                    imgUrls.map((v, i) => (
                        <ImageListItem key={i}>
                            <img key={i} cols={i === 3 ? 3 : 1} rows={i === 3 ? 3 : 1} style={{ height: '100%' }} src={v} />
                        </ImageListItem>
                    ))
                )}
            </ImageList>
            {datas.regularOpeningHours && (
                <div className="open-data">
                    <div className={datas.regularOpeningHours.openNow ? 'open' : 'close'}>{datas.regularOpeningHours.openNow ? '영업중' : '영업종료'}</div>
                    <ul className="open-description">
                        {datas.regularOpeningHours.weekdayDescriptions.map((v, i) => (
                            <li className={`open-day ${i === moment().day() ? 'on' : ''}`}>{v}</li>
                        ))}
                    </ul>
                </div>
            )}
            {!datas.regularOpeningHours && <div className="open-data-null">영업시간 정보가 없습니다.</div>}
            <div className="recommend">
                <div className="writer-wrap">
                    <div>
                        이 장소는 <span>지유마스터</span>님이 추천한 장소에요!
                    </div>
                    <div className="comment">"한국에서 젤 맛있게 먹은 장어덮밥집"</div>
                </div>
                <button>가고 싶어요</button>
            </div>
        </div>
    );
};

export default PlaceDetailModal;
