"use client"

import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Chart(props: { value: number, title: string }) {
    const option = {
        series: [
            {
                type: 'gauge',
                min: 0,
                max: 500,
                progress: {
                    show: true,
                    overlap: true,
                    roundCap: true,
                    width: 25,
                    itemStyle: {

                        color: {
                            type: 'linear',
                            x: 1,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(231, 73, 63, 1)'  // color at 0%
                            }, {
                                offset: 1, color: 'rgba(80, 205, 137, 1)' // color at 100%
                            }],
                            global: false // default is false,
                        }
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 25,
                        cap: "round",
                        miterLimit: 10
                    }
                },
                axisTick: {
                    show: true
                },
                splitLine: {
                    length: 10,
                    distance: 10,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: 30,
                    color: '#999',
                    fontSize: 12
                },
                anchor: {

                    size: 12,
                    itemStyle: {
                        borderWidth: 5
                    }
                },
                title: {
                    show: true
                },
                detail: {
                    valueAnimation: true,
                    fontSize: 30,
                    offsetCenter: [0, '80%']
                },
                data: [
                    {
                        value: 100,
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