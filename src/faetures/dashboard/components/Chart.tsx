"use client"

import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Chart(props: { value: number, title: string, max: number }) {
    const lineSize = (window.innerWidth / 20) < 25 ? window.innerWidth / 20 : 25
    const option = {
        series: [
            {
                type: 'gauge',
                min: 0,
                max: props.max,
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    width: lineSize,
                    itemStyle: {

                        color: {
                            type: 'linear',
                            x: 1,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: "#ACF5B0",//'rgba(231, 73, 63, 1)'  // color at 0%
                            }, {
                                offset: 1, color: "#ACF5B0" //'rgba(80, 205, 137, 1)' // color at 100%
                            }],
                            global: false // default is false,
                        }
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: lineSize,
                        cap: "round",
                        miterLimit: 10
                    }
                },
                axisTick: {
                    show: true
                },
                splitLine: {
                    length: lineSize < 25 ? 8 : 10,
                    distance: lineSize < 25 ? 8 : 10,
                    lineStyle: {
                        width: lineSize < 25 ? 0 : 2,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: lineSize < 25 ? 25 : 30,
                    color: '#999',
                    fontSize: lineSize < 25 ? 8 : 12
                },
                anchor: {

                    size: lineSize < 25 ? 6 : 12,
                    itemStyle: {
                        borderWidth: lineSize < 25 ? 1 : 5
                    }
                },
                title: {
                    show: true
                },
                detail: {
                    valueAnimation: true,
                    fontSize: lineSize < 25 ? 25 : 30,
                    offsetCenter: [0, '100%']
                },
                data: [
                    {
                        value: props.value,
                        name: props.title,
                        title: {
                            show: true
                        }
                    }
                ],
                splitNumber: 5
            }
        ]
    };

    return <ReactEcharts option={option} style={{
        width: "100%"
    }} />;
}