import { NextResponse } from "next/server";
import Fetch from "./common/Fetch";
export default function middleware(req){

    const superUserToken =req.cookies.get("super%20user%20token");
    const vendorToken = req.cookies.get("vendor%20token");

    let url=req.url;
    if(!superUserToken&&url.includes('/superuser/dashboard')){
        return NextResponse.redirect("http://localhost:3001/superuser/login");
    }
    if(url.includes("/vendor")){

    }
    else if(url.includes("/vendor/login")){

    }
    else if(!vendorToken&&url.includes('/vendor/')){
        return NextResponse.redirect("http://localhost:3001/vendor/login");
    }
    
}