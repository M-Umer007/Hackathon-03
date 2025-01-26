
import { createClient } from "next-sanity";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/rules-of-hooks */





const client = createClient({
    projectId: "0j1bigzv",
    dataset : "production",
    useCdn:true,
    apiVersion: 'v2025-01-18'

})

export async function sanityFetch({query, params={ }}: {query:string , params?:any}){
    return await client.fetch(query,params)
}