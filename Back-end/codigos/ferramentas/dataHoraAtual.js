exports.dataHoraAtual = () => {
    let data = new Date();

    let dia = data.getDate().toString();
    dia = dia.length == 1 ? `0${dia}`: dia;

    let mes = data.getMonth().toString();
    mes = mes.length == 1 ? `0${mes}`: mes;

    var hora = data.getHours().toString();
    hora = hora.length == 1 ? `0${hora}`: hora;

    var min = data.getMinutes().toString();
    min = min.length == 1 ? `0${min}`: min;
    
    var seg = data.getSeconds().toString();
    seg = seg.length == 1 ? `0${seg}`: seg;

    return `[${dia}/${mes}/${data.getFullYear()} ${hora}:${min}:${seg}]`;
}