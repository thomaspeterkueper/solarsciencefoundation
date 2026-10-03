# Batterien: von Redox zum Batteriepack

Implements #71.

## Lernpfad
1. Was eine Batterie speichert: chemische freie Energie, nicht "Elektronen im Akku".
2. Redox: Elektronen fließen im äußeren Stromkreis; Ionen bewegen sich im Inneren.
3. Anode, Kathode, Elektrolyt, Separator und Stromableiter.
4. Spannung, Strom, Kapazität (Ah), Energie (Wh) und Leistung (W).
5. Reihen- und Parallelschaltung.
6. C-Rate, SOC, DoD und SOH.
7. Temperatur, Innenwiderstand und Lade-/Entladegrenzen.
8. Alterung und Sicherheitsmechanismen.
9. BMS, Thermal Management, Zelle -> Modul -> Pack -> System.
10. Chemiefamilien und missionsabhängige Trade-offs.
11. Rohstoffe, Herstellung, Second Life und Recycling.

## Demonstrator contract
Inputs: chemistry, required energy/power, temperature, mass/volume limit, charge time, cycles/lifetime, SOC window.
Outputs: conceptual topology, usable energy, power margin, thermal consequence, aging consequence and explicit trade-offs.

Always distinguish cell and pack values. LFP vs NMC vs sodium-ion is an application exercise; CATL Naxtra is a dated case study, not the foundation.
