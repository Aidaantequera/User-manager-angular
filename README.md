# User Manager - Angular CRUD Application

Una aplicación completa de gestión de usuarios desarrollada con Angular que demuestra el consumo de APIs externas y la implementación de todas las operaciones CRUD.

## 🚀 Descripción del Proyecto

Este proyecto fue desarrollado como parte del aprendizaje de Angular, enfocándose en la integración con APIs REST externas. La aplicación permite gestionar usuarios de forma completa con una interfaz moderna y responsive.

## ✨ Características Principales

- **🌐 Consumo de API REST externa** - Integración completa con servicios web
- **🛣️ Sistema de rutas dinámicas** - Navegación fluida entre vistas
- **📝 CRUD completo** - Crear, leer, actualizar y eliminar usuarios
- **🔧 Componentes reutilizables** - Arquitectura modular y escalable
- **✅ Formularios reactivos** - Validaciones en tiempo real
- **📱 Diseño responsive** - Compatible con desktop y mobile
- **🎨 Interfaz moderna** - Usando Bootstrap y SweetAlert2

## 🛠️ Tecnologías Utilizadas

- **Angular 19.1.5** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Bootstrap** - Framework CSS
- **SweetAlert2** - Alertas elegantes
- **API REST** - Integración con servicios externos

## 📋 Funcionalidades

### Rutas Implementadas
- `/home` - Listado de usuarios en formato grid
- `/user/:id` - Vista detalle de usuario específico
- `/newuser` - Formulario para crear nuevo usuario
- `/updateuser/:id` - Formulario para editar usuario existente

### Validaciones
- ✅ Campos obligatorios
- ✅ Formato de email válido
- ✅ Validación en tiempo real
- ✅ Mensajes de error personalizados

### Operaciones CRUD
- **Create** - Registro de nuevos usuarios
- **Read** - Visualización de lista y detalles
- **Update** - Edición de usuarios existentes
- **Delete** - Eliminación con confirmación

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- Angular CLI

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Aidaantequera/User-manager-angular.git
cd User-manager-angular
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar la aplicación**
```bash
ng serve
```

4. **Abrir en el navegador**
Navegar a `http://localhost:4200/`

La aplicación se recargará automáticamente cuando modifiques los archivos fuente.

## 🔧 Comandos de Desarrollo

### Servidor de desarrollo
```bash
ng serve
```

### Generar componentes
```bash
ng generate component component-name
```

### Compilar el proyecto
```bash
ng build
```
Los artefactos de compilación se almacenarán en el directorio `dist/`.

### Ejecutar pruebas unitarias
```bash
ng test
```

### Ejecutar pruebas end-to-end
```bash
ng e2e
```

## 📚 Lo que se Aprendió

- 🏗️ Arquitectura de componentes en Angular
- 🛣️ Manejo de rutas y parámetros
- 🌐 Consumo de APIs REST
- 📝 Formularios reactivos y validaciones
- 🎨 Diseño responsive y principios UX/UI
- 🔄 Comunicación entre componentes
- 🚀 Servicios e inyección de dependencias

## 📱 Vista Previa

El proyecto incluye diseños responsive que se adaptan tanto a desktop como a dispositivos móviles, garantizando una experiencia de usuario óptima en todas las plataformas.

## 📖 Recursos Adicionales

Para más información sobre Angular CLI, incluyendo referencias detalladas de comandos, visita la [documentación oficial de Angular CLI](https://angular.dev/tools/cli).

---

*Proyecto desarrollado como parte del aprendizaje en desarrollo frontend con Angular. Cada línea de código representa un paso más en el crecimiento profesional.*
