import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import react from 'react';
interface IHistorical{
    time_open:string;
    time_close:string,
    open:number;
    high:number;
    low:number;
    close:number;
    volume:number;
    market_cap:number;
}

interface PriceParams {
    coinId: string;
}

const PriceData = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
div{
    align-items:center;
    justify-content:center;
    display:flex;
    width:440px;
    border-radius:30px;
    height:50px;
    background-color:rgba(0,0,0,0.4);
    margin: 10px 0px;
}
`



function Price(){
    const PriceCoinId = useParams<keyof PriceParams>() as PriceParams
    const coinId = PriceCoinId.coinId
    const {isLoading, data} = useQuery<IHistorical>(
        ['ohlcv',coinId],
        ()=>fetchCoinHistory(coinId)
    )            //@ts-ignore
    console.log(data[0])
    return (
        <>
        {isLoading? 'Loading Price...' : (
           <PriceData>
            <div>    
               Close : {//@ts-ignore
                data && data[1]?.close}
            </div>
            <div>
            High : {//@ts-ignore
              data && data[1]?.high}
            </div>
            <div>
            Low : {//@ts-ignore
               data && data[1]?.low}
            </div>
            <div>
            Open : {//@ts-ignore
               data && data[1]?.open}
            </div>
            <div>
            Volume : {//@ts-ignore
               data && data[1]?.volume}
            </div>
            </PriceData>
        )}
        </>
    )
}

export default Price;