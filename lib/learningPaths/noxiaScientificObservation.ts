import type { LearningPath } from '../learningPaths';

/**
 * SSF bridge for NOXIA's epistemic observation loop.
 * Learners move from measurement to evidence, uncertainty, sensor choice and
 * technology development instead of treating instruments as truth machines.
 */
export const noxiaScientificObservationLearningPath: LearningPath = {
  id:'PATH:SSF:NOX-SCIENTIFIC-OBSERVATION-0001',
  title:'Wie wird aus einem Signal belastbares Wissen?',
  subtitle:'Messen, Unsicherheit erkennen, Evidenz kombinieren und entscheiden, wann ein besseres Instrument nötig ist.',
  status:'prototype',
  sourceModuleId:'SSF-NOX-OBSERVATION-0001',
  kxfModuleId:'LRN:SSF:NOX-SCIENTIFIC-OBSERVATION',
  domainsNeeded:['KD:PHYS:N1','KD:GEO:N1','KD:MATH:N1','KD:ENG:N1'],
  suppliedBy:{
    knowledgeGraph:['Messgröße, Evidenz, Unsicherheit und Instrumentfähigkeit als getrennte Begriffe','Voraussetzungen für Spektroskopie, Magnetik, Gravimetrie und Probenahme'],
    kueperCom:[],
    overtimeArchive:['Reale Forschungsanker können als Fallbeispiele mit Provenienz und Evidenzreife eingebunden werden'],
    ssf:['Didaktische Sequenz Beobachtung → Messung → Interpretation → Verifikation → Anwendung','NOXIA-Transfer auf Prospektion und Instrumententwicklung']
  },
  unlocks:['UNL:NOX:scientific-observation','UNL:NOX:prospecting-evidence'],
  units:[
    {id:'UNIT:NOX-OBS-1',title:'Ein Messgerät zeigt nicht die Wahrheit',entryQuestion:'Ein Scanner meldet eine Anomalie. Weißt du damit schon, was dort im Boden liegt?',takeaway:'Eine Messung ist beobachtete Evidenz; die Aussage über ihre Ursache ist eine Interpretation.',gate:{type:'quiz_all_correct',unlocksUnitId:'UNIT:NOX-OBS-2'},sections:[
      {id:'OBS:NOX-OBS-SIGNAL',kind:'observation',title:'Signal, Ursache, Schlussfolgerung',summary:'Vergleiche drei Ebenen: Das Instrument registriert ein Signal; ein Modell ordnet es einer möglichen Ursache zu; erst weitere Evidenz kann diese Interpretation stützen oder widerlegen.',depthPoints:5},
      {id:'EXPL:NOX-OBS-LAYERS',kind:'explanation',title:'Beobachtung ≠ Interpretation',summary:'Messwert, Unsicherheit, Kalibrierung und Messbedingungen gehören zur Beobachtung. Die vermutete Lagerstätte ist eine daraus abgeleitete Hypothese und muss als solche erkennbar bleiben.',depthPoints:8},
      {id:'EXP:NOX-OBS-CLASSIFY',kind:'exercise',title:'Was weißt du wirklich?',summary:'Ordne Aussagen zu: direkt gemessen, aus einem Modell abgeleitet oder noch unbekannt. Begründe, warum ein interner Simulationswert kein zulässiger Messwert ist.',depthPoints:10},
      {id:'QUIZ:NOX-OBS-1',kind:'quiz',title:'Messung oder Interpretation?',summary:'Ein Magnetometer misst eine Feldanomalie. Welche Aussage ist unmittelbar gemessen?||Die Feldabweichung*||Eine große Eisenerzlagerstätte||Der exakte Erzgehalt||Der Marktwert des Vorkommens---Warum darf eine Interpretation unsicher bleiben?||Mehrere Ursachen können dasselbe Signal erzeugen*||Messgeräte liefern grundsätzlich Zufallszahlen||Unsicherheit bedeutet Messung ohne Einheit||Modelle dürfen keine Daten verwenden',depthPoints:6}
    ]},
    {id:'UNIT:NOX-OBS-2',title:'Unsicherheit ist Information',entryQuestion:'Zwei Messungen unterscheiden sich leicht. Welche davon ist falsch?',takeaway:'Unsicherheit beschreibt die Grenzen einer Aussage; sie ist kein Makel, sondern Teil des Ergebnisses.',gate:{type:'quiz_all_correct',unlocksUnitId:'UNIT:NOX-OBS-3'},sections:[
      {id:'EXPL:NOX-OBS-UNCERTAINTY',kind:'explanation',title:'Genauigkeit, Auflösung und Nachweisgrenze',summary:'Ein Sensor kann eine gute Ortsauflösung besitzen und trotzdem eine schwache Signatur nicht nachweisen. Unsicherheit, Auflösung, Nachweisgrenze und Reichweite beschreiben unterschiedliche Grenzen.',depthPoints:10},
      {id:'EXP:NOX-OBS-REPEAT',kind:'experiment',title:'Wiederholen ohne Wahrheitsautomat',summary:'Vergleiche wiederholte Messungen mit unterschiedlichen Signalstärken. Wiederholung kann Zufallsanteile reduzieren, beseitigt aber keine systematische Fehlkalibrierung und garantiert keine Entdeckung.',interactive:true,depthPoints:12},
      {id:'EXPL:NOX-OBS-NEGATIVE',kind:'explanation',title:'Auch ein Nichtfund ist Evidenz',summary:'Eine Bohrung ohne Treffer beweist nicht automatisch, dass kein Vorkommen existiert. Sie schränkt die Hypothese dort ein, wo Koordinate, Tiefe und Probenqualität tatsächlich untersucht wurden.',depthPoints:8},
      {id:'QUIZ:NOX-OBS-2',kind:'quiz',title:'Grenzen richtig lesen',summary:'Ein Sensor kann ein Signal unterhalb seiner Nachweisgrenze nicht erkennen. Was folgt aus einem Nichtfund?||Das Ziel existiert sicher nicht||Die Messung schließt es nur im erreichbaren Empfindlichkeitsbereich ein oder aus*||Die Geologie ist falsch||Die Position ist immer falsch---Welche Größe beschreibt, wie fein zwei nahe Orte getrennt werden können?||Räumliche Auflösung*||Marktpreis||Energieinhalt||Forschungsbudget',depthPoints:7}
    ]},
    {id:'UNIT:NOX-OBS-3',title:'Das passende Instrument zur Frage',entryQuestion:'Warum kann ein besseres Spektrometer trotzdem das falsche Werkzeug sein?',takeaway:'Ein Instrument ist nur dann geeignet, wenn Observable, Umgebung und Leistungsgrenzen zur Messfrage passen.',gate:{type:'quiz_all_correct',unlocksUnitId:'UNIT:NOX-OBS-4'},sections:[
      {id:'EXPL:NOX-OBS-METHODS',kind:'explanation',title:'Verschiedene Methoden sehen Verschiedenes',summary:'Der aktuelle NOXIA-Katalog trennt bewusst Messgrößen: Hyperspektralanalyse beobachtet spektrale Reflexion, Magnetometrie Magnetfeldanomalien, Gravimetrie Dichtekontraste, Seismik Untergrundstruktur und orbitales Remote Sensing regionale Signaturen. Eine direkte Kernprobe liefert dagegen lokale Materialevidenz.',depthPoints:10},
      {id:'EXP:NOX-OBS-SENSOR-CHOICE',kind:'exercise',title:'Plane eine Prospektionskampagne',summary:'Wähle für drei Fragen geeignete Messmethoden und begründe Reichweite, Auflösung, Nachweisgrenze und mögliche Mehrdeutigkeiten. Kombiniere unabhängige Methoden, wenn eine einzelne Messart nicht genügt.',depthPoints:14},
      {id:'EXAMPLE:NOX-OBS-PROSPECTING',kind:'example',title:'NOXIA: vom Kandidaten zur Bohrung',summary:'Ein Oberflächenscan liefert eine Anomalie. Je nach Frage folgen Hyperspektralanalyse, Magnetometrie, Gravimetrie oder Seismik; unabhängige Evidenz grenzt Ort und mögliche Ursache ein. Eine gezielte Kernprobe kann die Interpretation bestätigen, verfeinern oder widersprechen. Ein Nichttreffer schränkt nur den tatsächlich beprobten Ort und Tiefenbereich ein.',depthPoints:10},
      {id:'QUIZ:NOX-OBS-3',kind:'quiz',title:'Sensoren nach Fähigkeit wählen',summary:'Warum kombiniert man unabhängige Messmethoden?||Sie können unterschiedliche Ursachen gegeneinander prüfen*||Damit jeder Sensor denselben Wert liefert||Weil Kalibrierung dann unnötig wird||Um Unsicherheit zu verstecken---Was entscheidet zuerst über die Eignung eines Instruments?||Ob es die benötigte Messgröße unter den Bedingungen erfassen kann*||Seine Farbe||Sein Kaufdatum||Die Zahl der Anzeigen',depthPoints:7}
    ]},
    {id:'UNIT:NOX-OBS-4',title:'Wenn die Messfrage besser ist als dein Instrument',entryQuestion:'Du weißt genau, was du messen müsstest — aber kein vorhandenes Instrument schafft die nötige Reichweite und Unsicherheit. Was nun?',takeaway:'Eine Wissenslücke wird erst dann zum Entwicklungsziel, wenn die benötigte Beobachtung mit vorhandener Technik nicht ausreichend möglich ist.',sections:[
      {id:'EXPL:NOX-OBS-GAP',kind:'explanation',title:'Von der Wissenslücke zur Fähigkeitslücke',summary:'Formuliere zuerst die Beobachtungsanforderung: Messgröße, Umgebung, Reichweite, Auflösung, Unsicherheit und Nachweisgrenze. NOXIA vergleicht diese Anforderung mit den tatsächlich vorhandenen Instrumentfähigkeiten. Reicht beispielsweise die Reichweite einer Seismikmessung für die Forschungsfrage aus, entsteht kein künstliches Entwicklungsprojekt; erst eine echte Lücke wird zum Forschungsziel.',depthPoints:10},
      {id:'EXP:NOX-OBS-SOLUTION-SPACE',kind:'exercise',title:'Mehr als eine technische Lösung',summary:'Vergleiche zwei Entwicklungswege für dieselbe Messlücke, etwa bessere Optik gegen Sensorarray und Datenfusion. Prüfe Zielerfüllung, benötigtes Wissen, Komponenten, Energie, Zeit und Risiko. Es muss nicht nur eine richtige Konstruktion geben.',depthPoints:14},
      {id:'EXPL:NOX-OBS-PREREQ',kind:'explanation',title:'Wissen ist eine technische Ressource',summary:'Ein vielversprechender Instrumentansatz kann an fehlendem Fachwissen, Material, Komponenten oder Fertigungsfähigkeit scheitern. Lernen und Forschung werden dadurch Teil derselben Entwicklungslogik.',depthPoints:10},
      {id:'EXAMPLE:NOX-OBS-TRANSFER',kind:'example',title:'Transfer: SSF → NOXIA',summary:'Wer Messprinzip, Unsicherheit und Sensorwahl verstanden hat, kann in NOXIA wissenschaftliche Evidenz einordnen und Entwicklungsentscheidungen begründen. Das Lernziel ist Verständnis und Anwendung, nicht ein magischer Bonus auf verborgene Weltwerte.',depthPoints:10},
      {id:'QUIZ:NOX-OBS-FINAL',kind:'quiz',title:'Vom Nichtwissen zur Forschung',summary:'Wann ist Instrumententwicklung fachlich begründet?||Wenn eine konkrete Beobachtungsanforderung von vorhandenen Instrumenten nicht erfüllt wird*||Nach jedem erfolglosen Scan||Sobald ein teureres Gerät existiert||Wenn ein Spieler exakte Ground-Truth-Werte möchte---Zwei Ansätze erfüllen dieselbe Messanforderung. Was kann ihre Wahl unterscheiden?||Wissen, Material, Komponenten, Energie, Zeit und Risiko*||Nur ihr Name||Nur ihre Farbe||Nichts; es darf nur eine Lösung geben',depthPoints:10}
    ]}
  ]
};
