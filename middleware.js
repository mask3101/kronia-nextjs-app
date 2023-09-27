import { NextResponse } from 'next/server'
import { useSelector } from "react-redux";

export function middleware(request) {   
  const url = request.nextUrl.clone()   
  if (url.pathname === '/login') {
    return NextResponse.redirect(new URL('/login',request.url))
  } 
  if (url.pathname === '/coincap') {
    return NextResponse.redirect(new URL('/coincap',request.url))
  }
  if (url.pathname === '/register') {
    return NextResponse.redirect(new URL('/register',request.url))
  } 
}

export const config = {
  matcher: []
}