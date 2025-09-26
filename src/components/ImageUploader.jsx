// src/components/ImageUploader.jsx   



import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function ImageUploader({ onUploadComplete, onUploadStart }) {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState([]);

  const handleUpload = async () => {
  if (files.length === 0) {
    setStatus("❌ No hay archivos seleccionados.");
    return;
  }

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return setStatus("❌ No estás autenticado.");

  const tokenResult = await user.getIdTokenResult(true);
  if (!tokenResult.claims.admin) return setStatus("❌ No tienes permisos de administrador.");

  if (onUploadStart) onUploadStart();

    try {                    //  handleUpload()
      setStatus("⏳ Subiendo imágenes...");
      const storage = getStorage(undefined, "gs://larepercha-b3997.firebasestorage.app");
      const urls = [];

      for (const file of files) {
        const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        urls.push(url);

        setStatus(`⏳ Subiendo imagen ${urls.length} de ${files.length}...`);
      }

      setStatus("✅ Todas las imágenes fueron subidas correctamente.");
      if (onUploadComplete) onUploadComplete(urls); // ← Devuelve array de URLs   
    } catch (err) {
      console.error(err);
      setStatus("❌ Error al subir las imágenes.");
      if (onUploadComplete) onUploadComplete([]);
    }
  };

  
  const handleFileChange = (e) => {                 //  Maneja la selección de archivos
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setPreview(selectedFiles.map(file => URL.createObjectURL(file)));
  };


  const handleRemovePreview = (index) => {     // Elimina una imagen de la selección
  const updatedFiles = [...files];
  const updatedPreview = [...preview];
  updatedFiles.splice(index, 1);
  updatedPreview.splice(index, 1);
  setFiles(updatedFiles);
  setPreview(updatedPreview);
  setStatus("🗑️ Imagen eliminada de la selección.");
};








  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "1rem" }}>
      <h3>📤 Subir imágenes</h3>
      <input
        type="file"
        multiple
        onChange= { handleFileChange}
          //handleUpload(); // ✅ sube automáticamente al seleccionar   , da errores de carga si se suben muchas imágenes} handleFileChange
/>

      <button
  onClick={handleUpload}
  disabled={files.length === 0}
  style={{
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#12e2ef",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: files.length === 0 ? "not-allowed" : "pointer",
    fontWeight: "bold"
  }}
>
  Subir imágenes
</button>

      <p>{status}</p>

      {preview.length > 0 && (
        <div style={{ display: "flex", gap: "10px", marginTop: "1rem", flexWrap: "wrap" }}>
          {preview.map((src, i) => (
  <div key={i} style={{ position: "relative", display: "inline-block" }}>
    <img
      src={src}
      alt={`Preview ${i + 1}`}
      style={{ width: "100px", borderRadius: "4px", boxShadow: "0 0 4px rgba(0,0,0,0.2)" }}
    />
    <button
      onClick={() => handleRemovePreview(i)}
      style={{
        position: "absolute",
        top: "-6px",
        right: "-6px",
        backgroundColor: "#ff4757",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "24px",
        height: "24px",
        fontSize: "14px",
        cursor: "pointer",
        boxShadow: "0 0 4px rgba(0,0,0,0.3)"
      }}
      title="Eliminar imagen"
    >
      ×
    </button>
  </div>
))}

        </div>
      )}
    </div>
  );
}
