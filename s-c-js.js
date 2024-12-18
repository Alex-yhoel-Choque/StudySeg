//Distribución prohibida, copyright team Minetoipex - by Alexs Yhoel- se aplican términos de uso.
//Distribution prohibited copyright team Minetoipex - by Alexs Yhoel - terms of use apply.
//Feature version 1.2
document.getElementById("addSoundButton").addEventListener("click", addSoundEntry);
document.getElementById("downloadButton").addEventListener("click", generatePack);const soundEntries = [];function addSoundEntry() {
  const container = document.createElement("div");
  container.classList.add("sound-entry");
const soundType = document.createElement("select");
soundType.innerHTML = `<option value="neutral">Neutral</option><option value="music">Music</option>`;
const soundFolder = document.createElement("select");
soundFolder.innerHTML = `<option value="mob">[MOB] /playsound mob.soundname @a</option><option value="ambient">[AMBIENT] /playsound ambient.soundname @a</option><option value="custom">[CUSTOM] /playsound custom.soundname @a</option><option value="otro">[OTRO] /playsound otro.soundname @a</option>`;
const soundName = document.createElement("input");soundName.type = "text";soundName.placeholder = "Nombre del sonido (sin espacios,solo minúsculas)";const soundFile = document.createElement("input");soundFile.type = "file";soundFile.accept = "audio"
  container.appendChild(soundName);
  container.appendChild(soundType);
  container.appendChild(soundFolder);
  container.appendChild(soundFile);
  document.getElementById("soundEntries").appendChild(container);
soundEntries.push({ soundName, soundType, soundFolder, soundFile });
}
function generatePack() {
  const packName = document.getElementById("packName").value || "Custom Sound Pack";
  const description = document.getElementById("description").value || "Descripción del pack";
  const zip = new JSZip();
  const soundsFolder = zip.folder("sounds");

  const soundDefinitions = {};
  soundEntries.forEach((entry, index) => {
    const folderName = entry.soundFolder.value;
    const fileName = entry.soundName.value || `sound${index + 1}`;
    soundDefinitions[`${folderName}.${fileName}`]={
      category: entry.soundType.value,
      sounds: [`sounds/${folderName}/${fileName}`]
    };
    const folderPath = soundsFolder.folder(folderName);
    const soundFile = entry.soundFile.files[0];
    if (soundFile) {
      folderPath.file(`${fileName}.ogg`, soundFile);
    }
  });
  zip.file("sounds/sound_definitions.json", JSON.stringify(soundDefinitions, null, 2));

  const manifest = {
   format_version: 2,
   header: {
     description: description,
     name: `${packName}§a  [§bCustomSound§a]`,
     uuid: generateUUID(),
     version: [1, 0, 0],
     min_engine_version: [1, 13, 0]
   },
   modules: [
     {
       description: `${description} §7[minetoipex tools for RP sounds]`,
       type: "resources",
       uuid: generateUUID(),
       version: [1, 0, 0]
                    }
                ]
 };
  zip.file("manifest.json", JSON.stringify(manifest, null, 2));

  const packIcon = document.getElementById("packIcon").files[0];
  if (packIcon) {
    zip.file("pack_icon.png", packIcon);
  }
zip.generateAsync({ type: "blob" }).then(function(content) {
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(content);
    downloadLink.download = `${packName}.mcpack`;
    downloadLink.click();
  });
}
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
