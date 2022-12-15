import { NextResponse } from "next/server";
export default function middleware(req){
    const superUserToken =req.cookies.get("super%20user%20token");
    const vendorToken = req.cookies.get("vendor%20token");
    let url=req.url;
    if(url.includes('/login')){
        let str=url.split("/login");
        if(superUserToken)
        return NextResponse.redirect(str[0]);
    }
    
}