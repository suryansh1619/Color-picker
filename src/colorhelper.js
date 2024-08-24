import chroma from 'chroma-js';
import Palette from './palette';
const levels=[50,100,200,300,400,500,600,700,800,900];

function generatepalette(starter){
    let newpalette={
        paletteName:starter.paletteName,
        id:starter.id,
        emoji:starter.emoji,
        colors:{}
    }
    for(let level of levels){
        newpalette.colors[level]=[];
    }
    for(let color of starter.colors){
        let scale=generateScale(color.color,10).reverse();
        for(let i in scale){
            newpalette.colors[levels[i]].push({
                name:`${color.name} ${levels[i]}`,
                id:color.name.toLowerCase().replace(/ /g,"-"),
                hex:scale[i],
                rgb:chroma(scale[i]).css(),
                rgba:chroma(scale[i]).css().replace("rgb","rgba").replace(")",",1.0)")
            })
        }
    }
    return newpalette;
}
function getrange(hexcolor){
    const end="#fff";
    return[
        chroma(hexcolor).darken(1.4).hex(),hexcolor,end
    ]
}

function generateScale(hexcolor,numberofcolors){
    return chroma.scale(getrange(hexcolor)).mode('lab').colors(numberofcolors);
}

export {generatepalette};

