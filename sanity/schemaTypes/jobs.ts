import { UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const jobs = defineType ({
    name: 'jobs',
    title: 'Jobs',
    type: 'document',
    icon:UserIcon,
    fields: [
         defineField({
            name:'title',
            title:'Title',
            type:'string',
            validation:(Rule)=>Rule.required().error('Title is required'),
         }),
         defineField({
            name:'description',
            title:'Description',
            type:'text',
            validation:(Rule)=>Rule.required().error('Description is required'),
         }),
         defineField({
            name:'image',
            title:'Image',
            type:'image',
            options:{
                hotspot:true,
            },
            validation:(Rule)=>Rule.required().error('Image is required'),
         }),
         defineField({
            name:'location',
            title:'Location',
            type:'string',
            validation:(Rule)=>Rule.required().error('Location is required'),
         }),
         
         defineField({
            name:'type',
            title:'Type',
            type:'array',
            of:[{type:'reference',to:[{type:'jobsType'}]}],
         }),
         defineField({
            name:'slug',
            title:'Slug',
            type:'slug',
            options:{
                source:'title',
                maxLength:96,
            },
         }),

    ],
    preview:{
        select:{
            title:'title',
            subtitle:'location',
        },
        prepare(select){
            const {title,subtitle}=select
            return{
                title,
                subtitle:subtitle,
            }
        }
    }

})