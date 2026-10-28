function renderApp1(container) {
    // Detecta automáticamente el número que viene en el código QR (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idExtintorEscaneado = urlParams.get('id') || "1";

    // Diccionario con los enlaces de las imágenes de fondo para cada extintor
    const imagenesPorExtintor = {
        1: "https://images.unsplash.com/photo-1497366216548-37526070297c", // Ejemplo para Portería
    };

    const urlImagenFondo = imagenesPorExtintor[idExtintorEscaneado] || "https://images.unsplash.com/photo-1507679799987-c73779587ccf";
    
    // Aplicar el fondo con un filtro translúcido
    const appMain = document.getElementById('appContainer') || document.body;
    appMain.style.backgroundImage = `linear-gradient(rgba(241, 245, 249, 0.88), rgba(241, 245, 249, 0.88)), url('${urlImagenFondo}')`;
    appMain.style.backgroundSize = "cover";
    appMain.style.backgroundPosition = "center";
    appMain.style.backgroundAttachment = "fixed";

    // Lista de ubicaciones de tus 44 extintores
    const listaUbicaciones = {
        1: "PORTERIA", 2: "BAÑOS VESTIERES", 3: "OFICINA ADM", 4: "ENTRADA ALM. GEN.",
        5: "ENTRADA ALM. PLG.", 6: "PASILLO ALM. S. EMG.", 7: "PASILLO ALM. GE. CARTON", 8: "ARMADO DE CARTON PISO 2",
        9: "OFICINA POSCO", 10: "PEGADO DE STICKERS", 11: "SALIDA EMERGENCIA N° 1", 12: "BAÑOS POSCO",
        13: "SALIDA EMERGENCIA N° 2", 14: "CUARTO FRIO N-5", 15: "CUARTO FRIO N-7", 16: "CUARTO FRIO VERDES Y DESPAC",
        17: "HORNOS", 18: "COCINA", 19: "BOTELLONES DE AGUA", 20: "ALM. FERTILIZANTES",
        21: "SATELITE BOM. MIRFE", 22: "ENTRADA BOM. MIRFE", 23: "SATELITE EN DEPOSITO DE ACPM", 24: "TORRE AIREACION NUEVA",
        25: "RESPEL", 26: "BOMBA FUM. 1", 27: "BOMBA FUM. 2", 28: "COMEDOR BQ 1",
        29: "BOMBA FUM. 3", 30: "BOMBA MIRFE 2", 31: "BOMBA FUM. 5", 32: "SATELITE BLOQUE 27",
        33: "EQUI. SOLDADURA TALLER 1", 34: "EQUI. SOLDADURA TALLER 2", 35: "EQUI. SOLDADURA TALLER 3", 36: "TALLER MTTO 2",
        37: "TALLER MTTO", 38: "CUARTO COMBUSTIBLES", 39: "CUARTO DE MAQUINAS 2", 40: "OFICINA MIRFE",
        41: "PLANTA ELECTRICA", 42: "CUARTO DE MAQUINAS 1", 43: "CONSULTORIO MÉDICO", 44: "OFICINAS ATENCION"
    };

    const ubicacionAsignada = listaUbicaciones[idExtintorEscaneado] || "Área General";

    container.innerHTML = `
        <div class="extintores-container">
            <h2>Verificación del Extintor N° ${idExtintorEscaneado}</h2>
            <p style="color: #16a34a; font-weight: bold; margin-bottom: 15px;">📍 Ubicación: ${ubicacionAsignada}</p>
            
            <div class="pestanas">
                <button type="button" class="tab-btn active" onclick="cambiarPestana('hoja1')">Hoja 1: Ficha</button>
                <button type="button" class="tab-btn" onclick="cambiarPestana('hoja2')">Hoja 2: Checklist</button>
            </div>

            <form id="formExtintores">
                <!-- HOJA 1 -->
                <div id="hoja1" class="tab-content active">
                    <h3>1. Ficha Técnica y Ubicación</h3>
                    <div class="grid-form">
                        <div>
                            <label>N° Extintor:</label>
                            <input type="number" id="ext_num" value="${idExtintorEscaneado}" readonly style="background: #e2e8f0;">
                        </div>
                        <div>
                            <label>Tipo de Agente:</label>
                            <select id="ext_agente">
                                <option value="ABC">ABC</option>
                                <option value="BC">BC</option>
                                <option value="Solkaflam">Solkaflam</option>
                                <option value="Agua">Agua</option>
                            </select>
                        </div>
                        <div>
                            <label>Tipo de Extintor:</label>
                            <select id="ext_tipo">
                                <option value="Multi">Multi</option>
                                <option value="CO2">CO2</option>
                                <option value="Gra - Ace">Gra - Ace</option>
                                <option value="Agua Presurizada">Agua Presurizada</option>
                            </select>
                        </div>
                        <div>
                            <label>Capacidad (LBS):</label>
                            <input type="text" id="ext_capacidad" value="10 lb">
                        </div>
                        <div>
                            <label>Ubicación:</label>
                            <input type="text" id="ext_ubicacion" value="${ubicacionAsignada}" readonly style="background: #e2e8f0;">
                        </div>
                    </div>
                    <button type="button" class="btn-siguiente" onclick="cambiarPestana('hoja2')">Siguiente: Inspección →</button>
                </div>

                <!-- HOJA 2 -->
                <div id="hoja2" class="tab-content">
                    <h3>2. Verificación de Partes y Estado</h3>
                    <div class="grid-chequeo">
                        ${generarSelectChequeo('Pintura', 'chk_pintura')}
                        ${generarSelectChequeo('Sello de Seguridad', 'chk_sello')}
                        ${generarSelectChequeo('Anillo de Verificación', 'chk_anillo')}
                        ${generarSelectChequeo('Manómetro', 'chk_manometro')}
                        ${generarSelectChequeo('Válvula', 'chk_valvula')}
                        ${generarSelectChequeo('Manguera', 'chk_manguera')}
                        ${generarSelectChequeo('Boquilla', 'chk_boquilla')}
                        ${generarSelectChequeo('Pasador / Pin', 'chk_pasador')}
                        ${generarSelectChequeo('Soporte', 'chk_soporte')}
                        ${generarSelectChequeo('Manija', 'chk_manija')}
                        ${generarSelectChequeo('Cilindro', 'chk_cilindro')}
                        ${generarSelectChequeo('Señalización', 'chk_senalizacion')}
                        ${generarSelectChequeo('Demarcación', 'chk_demarcacion')}
                    </div>

                    <hr style="margin: 20px 0;">

                    <div class="grid-form">
                        <div>
                            <label>Revisado Por:</label>
                            <select id="ext_revisado_por">
                                <option value="Inspector SST">Inspector SST</option>
                                <option value="Paula Patiño">Paula Patiño</option>
                                <option value="Andres Garzon">Andres Garzon</option>
                                <option value="Angela Tijaro">Angela Tijaro</option>
                            </select>
                        </div>
                        <div>
                            <label>Estado del Extintor:</label>
                            <select id="ext_estado">
                                <option value="VIGENTE">VIGENTE</option>
                                <option value="PRÓXIMO A VENCER">PRÓXIMO A VENCER</option>
                                <option value="VENCIDO">VENCIDO</option>
                                <option value="RETIRO / MANTENIMIENTO">RETIRO / MANTENIMIENTO</option>
                            </select>
                        </div>
                        <div class="full-width">
                            <label>Observaciones:</label>
                            <textarea id="ext_observaciones" rows="3" placeholder="Sin observaciones"></textarea>
                        </div>
                    </div>

                    <div class="acciones-form" style="margin-top: 20px;">
                        <button type="button" class="btn-anterior" onclick="cambiarPestana('hoja1')">← Volver</button>
                        
                        <!-- ÚNICO BOTÓN: GUARDAR Y ENVIAR A GOOGLE DRIVE -->
                        <button type="button" id="btnGuardarRegistro" style="background-color: #2563eb; color: white; padding: 14px 20px; border: none; border-radius: 6px; font-weight: bold; font-size: 16px; cursor: pointer; width: 100%; margin-top: 10px;">
                            💾 GUARDAR Y ENVIAR INSPECCIÓN
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `;

    // GUARDAR INSPECCIÓN Y ENVIAR AUTOMÁTICAMENTE A GOOGLE DRIVE
    document.getElementById('btnGuardarRegistro').addEventListener('click', function() {
        const registroExtintor = {
            "N° Extintor": document.getElementById('ext_num').value,
            "Ubicación": document.getElementById('ext_ubicacion').value,
            "Agente": document.getElementById('ext_agente').value,
            "Tipo": document.getElementById('ext_tipo').value,
            "Capacidad": document.getElementById('ext_capacidad').value,
            "Altura": "",
            "Fecha Registro": new Date().toLocaleString('es-CO'),
            "Revisión": "",
            "Vencimiento Programado": "",
            "Estado": document.getElementById('ext_estado').value,
            "Pintura": document.getElementById('chk_pintura').value,
            "Sello": document.getElementById('chk_sello').value,
            "Manómetro": document.getElementById('chk_manometro').value,
            "Válvula": document.getElementById('chk_valvula').value,
            "Manguera": document.getElementById('chk_manguera').value,
            "Boquilla": document.getElementById('chk_boquilla').value,
            "Pasador": document.getElementById('chk_pasador').value,
            "Soporte": document.getElementById('chk_soporte').value,
            "Manija": document.getElementById('chk_manija').value,
            "Cilindro": document.getElementById('chk_cilindro').value,
            "Señalización": document.getElementById('chk_senalizacion').value,
            "Demarcación": document.getElementById('chk_demarcacion').value,
            "Observaciones": document.getElementById('ext_observaciones').value,
            "Revisado Por": document.getElementById('ext_revisado_por').value,
            "Tomar o Adjuntar": "",
            "Proceso Realizado": "Inspección Mensual",
            "Fecha de vencimiento verificada": "",
            "Estado General": document.getElementById('ext_estado').value
        };

        // Guardar respaldo localmente en el celular por seguridad
        let historial = JSON.parse(localStorage.getItem('registros_extintores')) || [];
        const index = historial.findIndex(item => item["N° Extintor"] === registroExtintor["N° Extintor"]);
        if (index >= 0) {
            historial[index] = registroExtintor;
        } else {
            historial.push(registroExtintor);
        }
        localStorage.setItem('registros_extintores', JSON.stringify(historial));

        // Enviar automáticamente a Google Drive
        const urlGoogleScript = "https://script.google.com/macros/s/AKfycbw3jRyfsI1cTMMtep0wP9UIrgCYknAyMrbIpAdH-V4S98IRdcIn0FjMHeG17GYQoeyC/exec";

        fetch(urlGoogleScript, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registroExtintor)
        }).then(() => {
            alert(`✅ ¡Inspección del Extintor N° ${registroExtintor["N° Extintor"]} guardada y enviada a Google Drive con éxito![cite: 2]`);
        }).catch(err => {
            console.error("Error:", err);
            alert("Guardado en el celular, pero hubo un fallo al sincronizar con la nube.");
        });
    });
}

function generarSelectChequeo(etiqueta, id) {
    return `
        <div class="item-chequeo">
            <label>${etiqueta}</label>
            <select id="${id}">
                <option value="SI">SI</option>
                <option value="NO">NO</option>
                <option value="N/A">N/A</option>
            </select>
        </div>
    `;
}

function cambiarPestana(idHoja) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    document.getElementById(idHoja).classList.add('active');
    if (idHoja === 'hoja1') document.querySelectorAll('.tab-btn')[0].classList.add('active');
    else document.querySelectorAll('.tab-btn')[1].classList.add('active');
}