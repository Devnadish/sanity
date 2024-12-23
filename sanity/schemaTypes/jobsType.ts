import { defineField, defineType } from "sanity";

export const jobsType = defineType({
    name:'jobsType',
    title:'Jobs Type',
    type:'document',
    fields:[
        defineField({
            name:'title',
            title:'Title',
            type:'string',
        }),
    ],
    preview:{
        select:{
            title:'title',
        },
        prepare(select){
            const {title}=select
            return{
                title,
            }
        }
    }
})