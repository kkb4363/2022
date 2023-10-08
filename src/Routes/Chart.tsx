import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";


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

interface ChartProps{
    coinId:string;
}



function Chart(){
    const chartCoinId = useParams<keyof ChartProps>() as ChartProps 
    const coinId = chartCoinId.coinId
    const {isLoading, data} = useQuery<IHistorical>(
        ['ohlcv', coinId], 
    () => fetchCoinHistory(coinId)
   )
   
    return (
        <>
        {isLoading? "Loading chart..." : 
        //@ts-ignore
        <ReactApexChart 
        type='candlestick'
        series={[
            {           //@ts-ignore
                data:data?.map((price) => {
                    return[ 
                        price.time_close,
                        price.open,
                        price.high,
                        price.low,  
                        price.close
                    ];
                }),
            },
        ]}
        options={{
            theme:{
                mode:"dark",
            },
            chart:{
                type:'candlestick',
                height:350,
                width:500,
                toolbar:{
                    show:false,
                },
                background:'transparent',
            },
            stroke:{
                curve:"smooth",
                width:2,
            },
            yaxis:{
                show:false,
            },
            xaxis:{
                type:'datetime',
                                //@ts-ignore
                categories:data?.map((price)=>price.time_close),
                labels:{
                    style:{
                        colors:'#9c88ff'
                    }
                }
            },
            plotOptions:{
                candlestick:{
                    colors:{
                        upward:'#3c90eb',
                        downward:'#df7d46'
                    }
                }
            }
        }}/>
        
        }
        </>
    )
}

export default Chart;