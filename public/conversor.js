document.getElementById('btnConvertir').addEventListener('click', () => {
    const pesos = document.getElementById('pesos').value;
    const tipoCambio = document.getElementById('tipoCambio').value;

    if (!pesos || !tipoCambio) {
        alert('Por favor completa todos los campos');
        return;
    }

    fetch('/convertir-pesos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesos, tipoCambio })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

            document.getElementById('dolares').value = data.dolares.toFixed(2);
        })
        .catch(err => console.error(err));
});
