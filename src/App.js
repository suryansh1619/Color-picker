import React,{useEffect, useState} from 'react';
import Palette from './palette'
import seedcolors from './seedcolors';
import Palettelist from './palettelist';
import { generatepalette } from './colorhelper';
import Singlecolorpalette from './singlecolorpalette';
import {Routes,Route,useParams} from 'react-router-dom';
import Paletteform from './paletteform';
function App() {
  const savedpalettes=JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes,setpalettes]=useState(savedpalettes || seedcolors);

  function deletepalette(id){
    setpalettes([...palettes.filter(palette=>palette.id!==id)])
  }
  function savepalette(newp){
    setpalettes([...palettes,newp])
  }
  useEffect(()=>{
    window.localStorage.setItem("palettes",JSON.stringify(palettes))
  },[palettes]); 
  return (
    <Routes>
      <Route path="/" element={<Palettelist deletepalette={deletepalette} palettes={palettes}/>} />
      <Route path="/palette/:id" element={<Findpalette palettes={palettes}/>} />
      <Route path="/palette/:paletteid/:colorid" element={<Findcolor palettes={palettes}/>}/>
      <Route path="/palette/new" element={<Paletteform savepalette={savepalette} palettes={palettes}/>}/>
      <Route path='*' element={<h1>Error Not Found !</h1>}/>
    </Routes>
  );
}
function Findpalette({palettes}){
  const {id}=useParams();
  const foundpalette = palettes.find(function(palette){
    return palette.id===id
  });
  if (!foundpalette) {
    return <h1>Error Not Found !</h1>;
  }
  const palette = generatepalette(foundpalette);
  return <Palette {...palette} />;
}

function Findcolor({palettes}){
  const {paletteid,colorid}=useParams();
  const foundPalette = palettes.find(palette =>
    palette.id === paletteid
    );
  if (!foundPalette) {
    return <h1>Error Not Found!</h1>;
  }
  const foundColor = foundPalette.colors.find(color =>
    color.name.toLowerCase() === colorid
  ); 
  if (!foundColor) {
    return <h1>Error Not Found!</h1>;
  }
  return <Singlecolorpalette color={foundColor} palette={generatepalette(foundPalette)} />;
}

export default App;
