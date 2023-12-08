import { DataAvatars } from "../assets/JS/DataAvatars"

const UseAvatarIcon = (id) => {

    if(!id) return DataAvatars[0]

    const avatar = DataAvatars.find(avatar => avatar.id === id)

    //console.log("avatar",avatar)

    return avatar
}

export  {UseAvatarIcon}