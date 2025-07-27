(() => {
    const originalLoadBitmap = ImageManager.loadBitmap;

    ImageManager.loadBitmap = function(folder, filename, hue, smooth) {
        // Si no hay nombre de archivo, no hay nada que hacer.
        if (!filename) {
            return originalLoadBitmap.call(this, folder, filename, hue, smooth);
        }

        // --- ESTRATEGIA PARA MODO PRUEBA (NW.js) ---
        // 'Utils.isNwjs()' es true solo cuando juegas desde el editor.
        // Aquí podemos usar 'fs' para prevenir el error antes de que ocurra.
        if (Utils.isNwjs()) {
            const fs = require('fs');
            const path = require('path');
            // Obtenemos la ruta base del proyecto.
            const base = path.dirname(process.mainModule.filename);
            // Creamos la ruta completa a la imagen.
            const fullPath = path.join(base, folder, filename + '.png');

            // Si el archivo NO existe, creamos el placeholder y terminamos.
            // Esto evita que el motor intente cargar algo que no existe.
            if (!fs.existsSync(fullPath)) {
                console.warn(`[ImageFallback] Imagen faltante (Modo Prueba): ${folder}${filename}.png`);
                const fallback = new Bitmap(48, 48);
                fallback.fillRect(0, 0, 48, 48, 'rgba(255, 0, 255, 0.5)');
                return fallback;
            }
        }

        // --- ESTRATEGIA PARA JUEGO DESPLEGADO (o si el archivo existe en modo prueba) ---
        // Si estamos en un navegador o el archivo fue encontrado, procedemos a cargarlo.
        const bitmap = originalLoadBitmap.call(this, folder, filename, hue, smooth);

        // Añadimos el listener para capturar errores en el entorno de navegador,
        // donde no podemos usar 'fs'.
        bitmap.addLoadListener(loadedBitmap => {
            if (loadedBitmap.isError()) {
                console.warn(`[ImageFallback] Imagen faltante (Desplegado): ${folder}${filename}.png`);
                // Redimensionamos el bitmap roto y dibujamos el placeholder.
                loadedBitmap.resize(48, 48);
                loadedBitmap.fillRect(0, 0, 48, 48, 'rgba(255, 0, 255, 0.5)');
                // Hacemos que el bitmap se considere "reparado"
                loadedBitmap._error = false; 
            }
        });

        return bitmap;
    };
})();