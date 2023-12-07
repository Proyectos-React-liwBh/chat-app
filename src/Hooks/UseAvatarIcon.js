import { DataAvatars } from "../assets/JS/DataAvatars"

const UseAvatarIcon = (id) => {
    const avatar = DataAvatars.find(avatar => avatar.id === id)

    console.log(avatar)

    return avatar
}

export  {UseAvatarIcon}