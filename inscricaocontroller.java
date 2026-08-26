package com.barretos.api;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

// Classe que representa os dados recebidos do formulário
class InscricaoDTO {
    public String nomeCompleto;
    public LocalDate dataNascimento;
    public String sexo;
    public String tipoIngresso;
    public boolean querCamping;
    public String tamanhoBarraca;
    public int qtdPessoasCamping;
}

// Classe Controller do Spring Boot (O nome do arquivo DEVE corresponder a esta classe pública)
@RestController
@RequestMapping("/api/inscricao")
@CrossOrigin(origins = "*") 
public class InscricaoController {

    @PostMapping
    public String processarInscricao(@RequestBody InscricaoDTO dto) {
        double total = 0;

        if ("COMPLETO".equalsIgnoreCase(dto.tipoIngresso)) {
            total += 450.00;
        } else {
            total += 150.00;
        }

        if (dto.querCamping) {
            double baseBarraca = switch (dto.tamanhoBarraca != null ? dto.tamanhoBarraca.toUpperCase() : "") {
                case "P" -> 80.00;
                case "M" -> 140.00;
                case "G" -> 200.00;
                default -> 0.00;
            };
            total += baseBarraca + (dto.qtdPessoasCamping * 30.00);
        }

        return "Inscrição de " + dto.nomeCompleto + " processada no Java! Total: R$ " + total;
    }
}