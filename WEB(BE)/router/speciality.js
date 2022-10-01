import express from 'express';
import { db } from '../firebase/db.js';
import { collection, getDocs, doc, setDoc,addDoc } from 'firebase/firestore/lite';

export const router_speciality = express.Router();

router_speciality.get('/list', async (req, res) => {
    const test_col = collection(db, 'speciality');
    const snapshot = await getDocs(test_col);
    const doc_list = snapshot.docs.map(doc => doc.data());
    
    





let dataList = [
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "K계열전차승무",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "M계열전차승무",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "K계열전차부대정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "K계열전차포탑정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "M계열전차부대정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "M계열전차포탑정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "전차통신정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "장갑차조종",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "K-21보병전투차량승무",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "K-21보병전투차량부대정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "K-9자주포조종",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "다련장운용/정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "견인포정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "155mm 견인포병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "155mm자주포병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "K-55자주포정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "유해발굴기록병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "의장병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },

    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "훈련소조교병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },

    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "특전병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },

    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "신호정보/전자전운용",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },

    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "탐지분석병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },

    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "드론운용및정비병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },

    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "지형자료관리병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },

    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "정보보호병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },

    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "S/W개발병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },

    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "기동헬기운용병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },

    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["육군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "화생방시험병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },

    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "조타",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "병기",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "보급",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "통정",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "전탐",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "통기",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "의무",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "전공",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "전자",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "항공",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "전산",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "조리",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "통신",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "정보보호병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "CBT병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "S/W개발병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "신기술융합연구병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "빅데이터분석병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "전문의무병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "문화홍보",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "UDT",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "SSU",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "SSU",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "박격포",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "대전차화기",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "방공무기운용",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "야포",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "측지",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "자주포조종",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "유·무선운용",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "체계운용",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "통기",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "전탐",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "전산",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["해병대"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "급양",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "기상관측",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "장비물자보급",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "유류보급",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "조리",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "항공운수",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "특수정보",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "인사교육",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "일반",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "군사경찰",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "공병장비운전",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "경장갑차 운전",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "지상레이더체계정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "무선통신체계정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "전술항공통신체계정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "유선통신체계정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "항공전자 장비정비",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "식별보조병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "전문자격의무병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "비파괴검사병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "교육훈련매체개발병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "우주기상분석병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    },
    {
        "class" : "전문특기",
        "desc" : "",
        "imageSrc" : "",
        "kind" : "",
        "like" : 0,
        "military_kind" : ["공군"],
        "speciality_code" : {"marin" : "","army":"","airforce" : "","navy":""},
        "speciality_name" : "운항관리병",
        "tags" : ["교대근무","휴가많음","실내근무"]
    }
]


    // for (let i = 0; i < dataList.length; i++) {
    //     await addDoc(collection(db, "speciality"),  dataList[i]);
    // }

    return res.json(doc_list);
});

router_speciality.get('/list')