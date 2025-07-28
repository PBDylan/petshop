import "./styles.css"; // Caminho corrigido para o style.css, removendo 'styles/'

// Selecionar os elementos necessários do HTML
const newAppointment = document.querySelector(".new-appointment-button"); // Variável correta: newAppointment
const appointmentModal = document.getElementById("appointment-modal");
const closeModalButton = document.querySelector(".close-modal-button");
const appointmentForm = document.querySelector(".appointment-form"); // Selecionar o formulário
const agendaList = document.querySelector(".agenda-list"); // Selecionar a lista de agendamentos

// Selecionar os campos do formulário no modal
const tutorNameInput = document.getElementById("tutor-name");
const petNameInput = document.getElementById("pet-name");
const phoneInput = document.getElementById("phone");
const serviceDescriptionInput = document.getElementById("service-description");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");

// Função para abrir o modal
function openModal() {
  appointmentModal.classList.remove("hidden"); // Classe hidden sendo removida para mostrar o modal.
}

// Função para fechar o modal e limpar o formulário
function closeModal() {
  appointmentModal.classList.add("hidden"); // Classe hidden sendo adicionada para esconder o modal.
  appointmentForm.reset(); // Limpa o formulário ao fechar o modal
}

// Função para criar e adicionar um novo agendamento
function addAppointment(tutor, pet, service, date, time) {
  const appointmentItem = document.createElement("li");
  appointmentItem.classList.add("appointment-item");

  // Determinar a seção do dia (Manhã, Tarde, Noite) com base na hora
  let targetTimeSlot = null;
  const [hourStr] = time.split(":");
  const hour = parseInt(hourStr, 10);

  if (hour >= 9 && hour < 13) {
    // 09h-12h
    targetTimeSlot = agendaList.querySelector(
      ".time-slot.morning .appointments"
    );
  } else if (hour >= 13 && hour < 19) {
    // 13h-18h
    targetTimeSlot = agendaList.querySelector(
      ".time-slot.afternoon .appointments"
    );
  } else if (hour >= 19 && hour <= 21) {
    // 19h-21h
    targetTimeSlot = agendaList.querySelector(".time-slot.night .appointments");
  } else {
    console.warn("Horário fora das faixas definidas (09h-21h):", time);
    // Poderíamos adicionar a um "Outros Horários" ou dar um feedback ao usuário
    alert("Horário de agendamento fora do período permitido (09h-21h).");
    return; // Interrompe a adição do agendamento
  }

  if (!targetTimeSlot) {
    console.error("Seção de horário não encontrada para:", time);
    return;
  }

  // Conteúdo do item de agendamento (ajustado para aceitar serviço)
  appointmentItem.innerHTML = `
        <div class="appointment-time">${time}</div>
        <div class="appointment-details">
            <span class="pet-name">${pet}</span> / <span class="tutor-name">${tutor}</span>
            <span class="service-description">${service}</span>
        </div>
        <button class="remove-button">Remover agendamento</button>
    `;

  // Adiciona o novo item à lista correta
  targetTimeSlot.appendChild(appointmentItem);

  // Adicionar event listener para o novo botão de remover
  const newRemoveButton = appointmentItem.querySelector(".remove-button");
  newRemoveButton.addEventListener("click", (event) => {
    // Confirmar remoção (opcional)
    if (confirm("Tem certeza que deseja remover este agendamento?")) {
      event.target.closest(".appointment-item").remove();
    }
  });
}

// Adicionar ouvintes de evento (event listeners) - CONSOLIDADO E CORRIGIDO
// Abrir modal ao clicar no botão "NOVO AGENDAMENTO"
newAppointment.addEventListener("click", openModal); // Usando a variável newAppointment

// Fechar modal ao clicar no botão "X"
closeModalButton.addEventListener("click", closeModal);

// Fechar modal ao clicar fora do conteúdo (no overlay)
appointmentModal.addEventListener("click", (event) => {
  // Se o clique foi no overlay (e não no conteúdo do modal), fechar
  if (event.target === appointmentModal) {
    closeModal();
  }
});

// Opcional: Fechar modal ao pressionar a tecla ESC
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    !appointmentModal.classList.contains("hidden")
  ) {
    closeModal();
  }
});

// Lidar com o envio do formulário de agendamento
appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário (que recarregaria a página)

  // Capturar os valores dos campos
  const tutor = tutorNameInput.value.trim();
  const pet = petNameInput.value.trim();
  const phone = phoneInput.value.trim();
  const service = serviceDescriptionInput.value.trim();
  const date = dateInput.value.trim();
  const time = timeInput.value.trim();

  // Validação simples (você pode expandir isso)
  if (!tutor || !pet || !service || !date || !time) {
    alert("Por favor, preencha todos os campos!");
    return; // Interrompe se algum campo estiver vazio
  }

  // Adicionar o agendamento
  addAppointment(tutor, pet, service, date, time);

  // Fechar o modal após adicionar
  closeModal();
});

// --- Configuração do Flatpickr (já existente) ---
flatpickr("#date", {
  dateFormat: "d/m/Y", // Formato da data (ex: 10/01/2024)
  locale: "pt", // Define o idioma para português (necessita do locale)
  // Adicione o locale português
  onReady: function (selectedDates, dateStr, instance) {
    // Adiciona o locale pt-br dinamicamente
    if (typeof flatpickr.l10ns.pt === "undefined") {
      flatpickr.l10ns.pt = {
        weekdays: {
          shorthand: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          longhand: [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado",
          ],
        },
        months: {
          shorthand: [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez",
          ],
          longhand: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
          ],
        },
        ordinal: function () {
          return "";
        },
        firstDayOfWeek: 0,
        rangeSeparator: " a ",
        weekAbbreviation: "Sem.",
        scrollTitle: "Role para aumentar",
        toggleTitle: "Clique para alternar",
        amPM: ["AM", "PM"],
        yearAriaLabel: "Ano",
        monthAriaLabel: "Mês",
        hourAriaLabel: "Hora",
        minuteAriaLabel: "Minuto",
        time_24hr: true, // Use formato 24 horas
      };
    }
  },
});

// Inicializar Flatpickr para o campo de hora (apenas hora)
flatpickr("#time", {
  enableTime: true, // Habilita a seleção de hora
  noCalendar: true, // Desabilita o calendário, mostra apenas o seletor de hora
  dateFormat: "H:i", // Formato da hora (ex: 12:00)
  time_24hr: true, // Força o formato 24 horas
  locale: "pt", // Define o idioma para português
});

flatpickr("#main-date-selector", {
  dateFormat: "d/m/Y",
  locale: "pt",
  // Opcional: Adicionar um evento onChange para atualizar a agenda com a nova data
  onChange: function (selectedDates, dateStr, instance) {
    // Aqui você pode adicionar lógica para filtrar os agendamentos
    // com base na data selecionada. Por enquanto, apenas um console.log.
    console.log("Data da agenda principal selecionada:", dateStr);
    // Atualizar o texto do span com a nova data
    document.querySelector("#main-date-selector .selected-date").textContent =
      dateStr;
  },
});
