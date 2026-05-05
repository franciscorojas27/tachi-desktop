# Tachi Desktop — Manhwa & Manhua Reader (Wails + React + Go)

Una aplicación de escritorio elegante y moderna para explorar, buscar y leer manhwa/manhua. Construida con
`Wails` (Go backend) y `Vite` + `React` (frontend). Diseñada para uso local como app de escritorio multiplataforma
(Windows/macOS/Linux) con una UX pulida y desempeño nativo.

**Qué hace este repo**
- **Interfaz de escritorio**: Navegación lateral, tarjetas destacadas, vista de capítulos y lector integrado.
- **Búsqueda potente**: Filtrado por género, búsqueda por nombre y paginación optimizada.
- **Integración Go + React**: Lógica y mapeo de modelos en Go, UI rápida con Vite + TypeScript.
- **Fácil empaquetado**: Soporta `wails build` para generar ejecutables listos para distribuir.

**Por qué te va a gustar**
- Interfaz moderna con sombras, cards y layout responsivo para escritorio.
- Rendimiento nativo con la seguridad y facilidad de desarrollo de Go.
- Pensado para fans: muestra capítulos, etiquetas, estado (publicándose/finalizado) y conteo de capítulos.

**Capturas**
Las siguientes imágenes muestran la app en acción:

- Cabecera con detalles del manhwa: ![Detalle](https://private-user-images.githubusercontent.com/67331645/567482316-7a694337-a47c-44d9-937d-a5cc75ed1672.png)
- Vista de catálogo/galería: ![Galería](https://private-user-images.githubusercontent.com/67331645/567482314-9105d0ce-7919-4a51-b872-89203ffb8ac6.png)
- Página principal y secciones: ![Home](https://private-user-images.githubusercontent.com/67331645/567482313-37506357-c7b6-4702-b472-1a0f35087757.png)
- Vista de detalles ampliada: ![Detalles](https://private-user-images.githubusercontent.com/67331645/567482315-0aea099a-d90d-45f2-a967-8d0946dfa5e6.png)

**Estructura clave del proyecto**
- `app.go`, `main.go`: Entry points de la app Go/Wails.
- `frontend/`: Código React + Vite (UI). Ver `frontend/src` para componentes.
- `models/`, `services/`, `libs/`: Mapeo, modelos y utilidades en Go.
- `manhwa.json`: Muestra de datos y fixtures.

**Instalación y desarrollo (local)**
Requisitos: `Go` (1.20+ recomendado), `node`/`npm` o `pnpm`, `wails` (opcional para empaquetado) y `gh` si quieres publicar en GitHub.

1. Clona el repo y entra en la carpeta:

	 git clone <tu-repo.git>
	 cd tachi-desktop

2. Instala dependencias del frontend:

	 cd frontend
	 npm install

3. Ejecuta la app en modo desarrollo (desde la raíz del repo):

	 wails dev

	 - O alternativamente, para solo frontend durante desarrollo:
		 cd frontend && npm run dev

4. Para compilar empaquetados de distribución:

	 wails build

	 Los binarios se generan en `build/bin` según la plataforma.

**Comandos Git + GitHub (rápido)**
Si quieres que prepare el repo, cree el remoto y una release, estos son los pasos que ejecutaré (puedes copiarlos manualmente o dejarme ejecutarlos aquí si autorizas):

- Inicializar git y commit inicial:

	git init
	git add -A
	git commit -m "chore: initial commit — Tachi Desktop"

- Crear repo remoto con GitHub CLI y subir (remplaza `tachi-desktop` por el nombre deseado):

	gh repo create your-username/tachi-desktop --public --source=. --remote=origin --push

- Crear una release (tag v0.1.0) con notas:

	git tag v0.1.0
	git push origin v0.1.0
	gh release create v0.1.0 --title "v0.1.0" --notes "Versión inicial: interfaz, búsqueda y empaquetado con Wails."

Nota: `gh` pedirá autenticación si no estás logueado.

**Cómo contribuir**
- Abre un issue o un PR con mejoras: traducciones, soporte multi-idioma, mejoras del lector o integración con fuentes externas.
- Sigue la convención de commits (tipo: scope — mensaje) para mantener el historial legible.

