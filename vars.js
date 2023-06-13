//Массив для страницы "Теория"
const articles = [
  {
    title: 'Часть 1 - Документация',
  content: `<p>
    Начало знакомства с любой вещью лучше всего начинать с инструкции.
    В некоторых случаях ясно все и так, в других — «хм, ничего не
    работает, похоже все-таки надо почитать инструкцию».
    Микроконтроллеры — устройства достаточно сложные, и без прочтения
    документации с ними уж точно ничего полезного не сделаешь, хотя…
  </p>
  <p>
    В этой статье мы рассмотрим, как на&nbsp;официальном сайте
    производителя организована документация на микроконтроллеры STM32,
    в частности на серию STM32F1.
  </p>
  <p>
    После каких-нибудь AVR-ок, можно испытать легкий шок от количества
    разных PDF-ок на микроконтроллеры STM32. Куда глядеть первым
    делом? Как этим пользоваться? Что ваще происходит?? С первого
    взгляда ни чего не понятно. Поэтому я решил сделать небольшой
    обзор мира документации на эти замечательные микроконтроллеры.
    Особый упор буду делать на&nbsp;STM32F103C8T6, так как далее
    планирую написать несколько уроков по использованию именно этого
    камушка.
  </p>
  <p>Основными документами на STM-ки являются следующие:</p>
  <ol>
    <li>Datasheet</li>
    <li>Reference manual</li>
    <li>Programming Manual</li>
    <li>Errata Sheet</li>
  </ol>
  <h2>Datasheet</h2>
  <p>
    Datasheet содержит в себе информацию о наличии определенной
    периферии в конкретном МК, цоколевке, электрических
    характеристиках и маркировке чипов для STM32F103x8
    и&nbsp;STM32F103xB
  </p>

  <h3>Основное в&nbsp;Datasheet-е</h3>
  <p>
    В первую очередь нужно обратить внимание на раздел&nbsp;<em
      >7.&nbsp;Ordering information scheme</em
    >, в котором указано, то обозначает каждый символ в маркировке.
    Например, для STM32F103C8T6: корпус&nbsp; LQFP-48, 64Кб flash-а,
    температурный диапазон&nbsp;–40 to 85 °C.
  </p>

  <p>
    Далее&nbsp;<em>2.1 Device overview</em>. В нем есть таблица, в
    которой сказано, какая периферия есть в конкретном
    микроконтроллере и в каком количестве:
  </p>

  <p>
    Основное различие между микроконтроллерами из разных колонок в
    количестве ножек и объеме флеша, остальное все одинаково.
    Небольшое исключение составляет первая колонка
    версий&nbsp;<strong>Tx</strong>: в этих микроконтроллерах поменьше
    модулей SPI, I2C и USART-ов. Нумерация периферии идет с единицы:
    то есть, если в&nbsp;STM32F103<strong>Cx</strong> у нас 2 SPI, то
    они имеют имена SPI1 и SPI2, а в&nbsp;STM32F103<strong>Tx</strong>
    у нас только SPI1. Так как&nbsp;Datasheet у нас на
    микроконтроллеры&nbsp;STM32F103x8 и&nbsp;STM32F103xB, то эта
    таблица справедлива только для этих моделей. К
    примеру&nbsp;STM32F103<strong>C8</strong>&nbsp;или&nbsp;STM32F103<strong
      >CB</strong
    >
    соответствуют этой таблице,
    а&nbsp;STM32F103<strong>C6</strong>&nbsp;нет, для него есть
    отдельный даташит.
  </p>
  <p>
    В разделе&nbsp;<em
      >2.2 Full compatibility throughout the family</em
    >
    говорится о том, что устройства&nbsp;STM32F103xx являются
    программно, функционально и&nbsp;pin-to-pin (для одинаковых
    корпусов) совместимыми.
  </p>
  <p>
    В&nbsp;reference manual-е&nbsp;есть разделение на следующие «виды»
    микроконтроллеров:&nbsp;STM32F103x4 и STM32F103x6 обозначены как
    <strong><em>low-density devices</em></strong
    >, STM32F103x8 и STM32F103xB как
    <strong><em>medium-density devices</em></strong
    >, STM32F103xC, STM32F103xD и STM32F103xE как
    <strong><em>high-density devices</em></strong
    >. В устройствах Low-density devices меньше Flash и RAM памяти,
    таймеров и периферийных устройств.&nbsp;High-density devices имеют
    больший объем Flash и RAM памяти, а так же имеют дополнительную
    периферию, такую как&nbsp;SDIO, FSMC, I2S и DAC, при этом
    оставаясь полностью совместимыми с другими представителями
    семейства&nbsp;STM32F103xx. То есть, если на каком-то этапе
    разработки стало ясно, что выбранного микроконтроллера не хватает
    для реализации всех возможностей, то можно безболезненно выбрать
    более навороченный камень без необходимости переписывать весь
    существующий софт, при этом, если новый камень будет в том же
    корпусе, то отпадает необходимость заново разводить печатную
    плату.
  </p>
  <h2>Reference manual</h2>
  <p>
    Поехали далее.&nbsp;Reference manual (справочное руководство)
    содержит подробное описание всей периферии, регистров, смещений, и
    так далее. Это основной документ, который используется при
    создании прошивки под микроконтроллер.&nbsp;Reference manual
    составлен для большой группы микроконтроллеров, в нашем случае для
    всех STM32F10xxx, а именно&nbsp;STM32F101xx, STM32F102xx,
    STM32F103xx и STM32F105xx/STM32F107xx. Но STM32F100xx не входят в
    этот RM, для них есть свой.
  </p>
  <h3>Главное в&nbsp;Reference manual-е</h3>
  <p>
    Как было сказано выше, в reference manual-е есть разделение на
    следующие «виды» микроконтроллеров:&nbsp;low-, medium-,
    high-density и connectivity<br />
    line. В <em>2.3&nbsp;Glossary</em> разъяснено, кто есть кто:
  </p>
  <ul>
    <li>
      <strong>Low-density devices</strong> это STM32F101xx,
      STM32F102xx и STM32F103xx микроконтроллеры, у которых размер
      Flash-памяти находится между 16 и 32 Kbytes.
    </li>
    <li>
      <strong>Medium-density devices</strong> это STM32F101xx,
      STM32F102xx and STM32F103xx, размер&nbsp;флеш-памяти
      между&nbsp;64 и 128 Kbytes.
    </li>
    <li>
      <strong>High-density devices</strong> это STM32F101xx и
      STM32F103xx, размер&nbsp;флеш-памяти между&nbsp;256 и 512
      Kbytes.
    </li>
    <li>
      <strong>XL-density devices</strong> это STM32F101xx и
      STM32F103xx, размер&nbsp;флеш-памяти между&nbsp;768 Kbytes и 1
      Mbyte.
    </li>
    <li>
      <strong>Connectivity line devices</strong> это микроконтроллеры
      STM32F105xx и STM32F107xx.
    </li>
  </ul>
  <p>
    Наш&nbsp;STM32F103C8T6 является&nbsp;Medium-density device-ом. Это
    будет полезно знать при изучении периферии, например, есть
    отдельные разделы про RCC для&nbsp;Low-, medium-, high- and
    XL-density устройств, и&nbsp;Connectivity line devices.
  </p>
  <p>
    Далее обратимся к Tabe 1. В ней отмечено, какой раздел применим к
    конкретному типу микроконтроллеров. У нас это&nbsp;Medium-density
    STM32F103xx:
  </p>

  <p>
    Далее все просто: идет куча разделов, в каждом из которых
    содержится описание на конкретную периферию и ее регистры
  </p>
  <h2>Programming Manual</h2>
  <p>
    Programming Manual не является документом первой необходимости в
    самом начале знакомства с STM-ми, однако является очень важным при
    углубленном изучении этих микроконтроллеров. Он содержит
    информацию о процессорном ядре, системе команд и периферии ядра.
    Причем это не та же самая периферия, которая описана
    в&nbsp;Reference manual-е.&nbsp; В нее входят:
  </p>
  <ul>
    <li>System timer — системный таймер</li>
    <li>
      Nested vectored interrupt controller — контроллер приоритетных
      прерываний
    </li>
    <li>System control block</li>
    <li>Memory protection unit</li>
  </ul>
  <p>
    Как только мы начнем знакомится с прерываниями в STM32, нам
    понадобится раздел&nbsp;<em
      >4.3 Nested vectored interrupt controller (NVIC)</em
    >. Ну и системный таймер является очень прикольной вещью, который
    будет полезен в каких-нибудь RTOS или для создания программных
    таймеров.
  </p>
  <h2>Errata Sheet</h2>
  <p>
    Errata Sheet — сборник всех известных аппаратных глюков и косяков
    микроконтроллеров и советов, как их обойти. Довольно веселый
    документ Перед использованием какой-либо периферии, советую суда
    заглянуть. Это может помочь сократить количество потерянных
    нервных клеток при отладке своей чудо-прошивки, которая ни как не
    хочет работать
  </p>`
},
  {
    title: 'Часть 2: IAR + CMSIS',
  content: `<h2>Введение</h2>
  <p>
    Cortex Microcontroller Software Interface Standard
    (CMSIS)&nbsp;содержит описание всех регистров микроконтроллера,
    таблицу векторов прерываний и некоторый стартовый код, который
    выполняется перед передачей управления функции main(). Вообще
    говоря, СMSIS является необязательным компонентом проекта, однако,
    в этом случае придется самому заботиться об огромном количестве
    вещей. Кроме того, эта библиотека позволяет писать в некоторой
    степени переносимый код с одного микроконтроллера, на другой.
  </p>
  <h2>Качаем CMSIS</h2>
  <p>
    В данный момент CMSIS поставляется совместно с&nbsp;STM32Cube MCU
    Package. Скачать его можно на странице выбранного микроконтроллера
    (там, где качали даташит, Reference manual и так далее),
    называется&nbsp;STM32CubeF1:
  </p>

  <p>
    Для скачивания нужно зарегистрироваться у них на сайте. Феее, ну и
    нафига они это сделали?:\ Оставлю ка я ссылку на архив в конце
    статьи, чтоб не возится во всеми этими регистрациями. Но все же
    лучше скачать актуальную версию библиотеки на официальном сайте.
    Весит архив к стати довольно много, 97 метров.
  </p>
  <h2>Создаем проект в IAR ARM</h2>
  <p>
    Теперь проводим небольшую подготовительную работу по созданию
    проекта в IAR ARM. Запускаем среду&nbsp;IAR Embedded Workbench:
  </p>

  <p>
    В IAR-e все проекты (Projects) находятся внутри Workspace-а,
    причем количество проектов в одном воркспейсе может быть
    несколько.
  </p>
  <p>Выбираем <em>Project-&gt;Create New Project…</em></p>

  <p>В открывшемся окне выбираем тип проекта: <em>C-&gt;main</em>:</p>

  <p>
    Нажимаем ОК, набираем какое-нибудь имя (в моем случае
    <em>test_proj</em>) и сохраняем в какой-нибудь папке:
  </p>
  <p>
    Проект создан.&nbsp;После этого выбираем
    <em>File-&gt;Save All</em> и в открывшемся окне набираем имя
    нашего&nbsp;Workspace-а, его можно назвать так же, как и проект.
  </p>
  <p>
    Теперь нам надо настроить проект под конкретный микроконтроллер, а
    именно <em>STM32F103C8</em>. Нажимаем правой кнопкой мыши на
    названии нашего проекта и выбираем пункт <em>Options…</em>
  </p>

  <p>
    В разделе<em> General Options</em> на вкладке
    <em>Target</em> выбираем наш микроконтроллер:
  </p>

  <p>
    Далее настаиваем уровень оптимизации компиляции. При отладке
    иногда натыкался на некоторые проблемы при высоком уровне
    оптимизации, поэтому советую в <em>C/C++ Compiler</em> на вкладке
    <em>Optimizations</em>&nbsp;ставить&nbsp;<em>None&nbsp;</em>или на
    крайняк <em>Low</em>:
  </p>

  <p>
    Складывать все файлы исходников в корень проекта не очень хорошая
    идея, в дальнейшем будет трудно ориентироваться среди кучи файлов,
    поэтому для CMSIS создадим одноименную папку <em>CMSIS</em> . Но
    нам необходимо указать компилятору путь, где искать исходники. Для
    этого на вкладке <em>Preprocessor </em>надо указать путь к папке с
    библиотекой. Чтоб не указывать абсолютные пути, в IAR-е существует
    переменная $PROJ_DIR$, в которой хранится путь к папке с
    проектом:<br />
  </p>

  <pre>
$PROJ_DIR$\
$PROJ_DIR$\CMSIS\</pre
  >
  <br />
  Первая строчка указывает на корень проекта, где лежит main.c, это
  вроде как не обязательно, но пусть будет, вторая на будущую папку с
  CMSIS. Обращаем внимание на стрелки прокрутки вкладок, выделил
  синим:

  <p>
    Теперь отладчик. В разделе <em>Debugger</em> на вкладке
    <em>Setup</em> выбираем <em>ST-LINK, </em>который идет в комплекте
    с отладочными платами Discovery:
  </p>

  <p>
    и на вкладке <em>Download</em> ставим галочку
    <em>Use flash loader(s)</em>:
  </p>

  <p>
    После этого в разделе <em>ST-LINK</em> выбираем тип интерфейса
    подключения, у нас по&nbsp;<em>SWD</em>:
  </p>

  <p>Фух, проект настроили. Нажимаем OK для сохранения изменений.</p>
  <p>
    После этого идем в каталог с проектом и создаем там папку
    <em>CMSIS</em>, в нее мы будем складывать файлы библиотеки
    CMSIS<em>:</em>
  </p>

  <h2>Библиотека CMSIS</h2>
  <p>
    Архив с&nbsp;STM32CubeF1 скачали, разархивировали. В нем
    содержится много разных вещей: документация, примеры для
    отладочных плат, драйверы HAL и сам&nbsp;CMSIS, который нам и
    нужен. CMSIS расположен в .\STM32Cube_FW_F1_V1.6.0\Drivers\CMSIS.
  </p>
  <p>Вначале идем в&nbsp;.\CMSIS\Device\ST\STM32F1xx\Include:</p>

  <p>
    У нас тут куча .h файлов для разных микроконтроллеров, но
    чего-нибудь наподобие stm32f103x8.h не видно.
    Открываем&nbsp;stm32f1xx.h. Там есть вот такая вещь:<br />
  </p>
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span
            >#if !defined (STM32F100xB) &amp;&amp; !defined
            (STM32F100xE) &amp;&amp; !defined (STM32F101x6) &amp;&amp;
            \</span
          >
        </div>
      </div>
      <div>
        <div>
          <span> !</span><span>defined</span> ><span>STM32F101xB</span
          ><span>)</span><span> &amp;&amp; !</span
          ><span>defined</span> <span>(</span><span>STM32F101xE</span
          ><span>)</span><span> &amp;&amp; !</span
          ><span>defined</span> <span>(</span><span>STM32F101xG</span
          ><span>)</span><span> &amp;&amp; !</span
          ><span>defined</span> <span>(</span><span>STM32F102x6</span
          ><span>)</span><span> &amp;&amp; !</span
          ><span>defined</span> <span>(</span><span>STM32F102xB</span
          ><span>)</span><span> &amp;&amp; !</span
          ><span>defined</span> <span>(</span><span>STM32F103x6</span
          ><span>)</span><span> &amp;&amp; \</span>
        </div>
      </div>
      <div>
        <div>
          <span> !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F103xB</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F103xE</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F103xG</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F105xC</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F107xC</span><span>)</span>
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F100xB */</span><span> </span
          ><span
            >/*!&lt; STM32F100C4, STM32F100R4, STM32F100C6,
            STM32F100R6, STM32F100C8, STM32F100R8, STM32F100V8,
            STM32F100CB, STM32F100RB and STM32F100VB */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F100xE */</span><span> </span
          ><span
            >/*!&lt; STM32F100RC, STM32F100VC, STM32F100ZC,
            STM32F100RD, STM32F100VD, STM32F100ZD, STM32F100RE,
            STM32F100VE and STM32F100ZE */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F101x6 */</span><span> </span
          ><span
            >/*!&lt; STM32F101C4, STM32F101R4, STM32F101T4,
            STM32F101C6, STM32F101R6 and STM32F101T6 Devices */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F101xB */</span><span> </span
          ><span
            >/*!&lt; STM32F101C8, STM32F101R8, STM32F101T8,
            STM32F101V8, STM32F101CB, STM32F101RB, STM32F101TB and
            STM32F101VB */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F101xE */</span><span> </span
          ><span
            >/*!&lt; STM32F101RC, STM32F101VC, STM32F101ZC,
            STM32F101RD, STM32F101VD, STM32F101ZD, STM32F101RE,
            STM32F101VE and STM32F101ZE */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F101xG */</span><span> </span
          ><span
            >/*!&lt; STM32F101RF, STM32F101VF, STM32F101ZF,
            STM32F101RG, STM32F101VG and STM32F101ZG */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F102x6 */</span><span> </span
          ><span
            >/*!&lt; STM32F102C4, STM32F102R4, STM32F102C6 and
            STM32F102R6 */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F102xB */</span><span> </span
          ><span
            >/*!&lt; STM32F102C8, STM32F102R8, STM32F102CB and
            STM32F102RB */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F103x6 */</span><span> </span
          ><span
            >/*!&lt; STM32F103C4, STM32F103R4, STM32F103T4,
            STM32F103C6, STM32F103R6 and STM32F103T6 */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F103xB */</span><span> </span
          ><span
            >/*!&lt; STM32F103C8, STM32F103R8, STM32F103T8,
            STM32F103V8, STM32F103CB, STM32F103RB, STM32F103TB and
            STM32F103VB */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F103xE */</span><span> </span
          ><span
            >/*!&lt; STM32F103RC, STM32F103VC, STM32F103ZC,
            STM32F103RD, STM32F103VD, STM32F103ZD, STM32F103RE,
            STM32F103VE and STM32F103ZE */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F103xG */</span><span> </span
          ><span
            >/*!&lt; STM32F103RF, STM32F103VF, STM32F103ZF,
            STM32F103RG, STM32F103VG and STM32F103ZG */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F105xC */</span><span> </span
          ><span
            >/*!&lt; STM32F105R8, STM32F105V8, STM32F105RB,
            STM32F105VB, STM32F105RC and STM32F105VC */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F107xC */</span><span> </span
          ><span
            >/*!&lt; STM32F107RB, STM32F107VB, STM32F107RC and
            STM32F107VC */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>#endif</span>
        </div>
      </div>
    </div>
    <div>
      #if !defined (STM32F100xB) &amp;&amp; !defined (STM32F100xE)
      &amp;&amp; !defined (STM32F101x6) &amp;&amp; \ !defined
      (STM32F101xB) &amp;&amp; !defined (STM32F101xE) &amp;&amp;
      !defined (STM32F101xG) &amp;&amp; !defined (STM32F102x6)
      &amp;&amp; !defined (STM32F102xB) &amp;&amp; !defined
      (STM32F103x6) &amp;&amp; \ !defined (STM32F103xB) &amp;&amp;
      !defined (STM32F103xE) &amp;&amp; !defined (STM32F103xG)
      &amp;&amp; !defined (STM32F105xC) &amp;&amp; !defined
      (STM32F107xC) /* #define STM32F100xB */ /*!&lt; STM32F100C4,
      STM32F100R4, STM32F100C6, STM32F100R6, STM32F100C8, STM32F100R8,
      STM32F100V8, STM32F100CB, STM32F100RB and STM32F100VB */ /*
      #define STM32F100xE */ /*!&lt; STM32F100RC, STM32F100VC,
      STM32F100ZC, STM32F100RD, STM32F100VD, STM32F100ZD, STM32F100RE,
      STM32F100VE and STM32F100ZE */ /* #define STM32F101x6 */ /*!&lt;
      STM32F101C4, STM32F101R4, STM32F101T4, STM32F101C6, STM32F101R6
      and STM32F101T6 Devices */ /* #define STM32F101xB */ /*!&lt;
      STM32F101C8, STM32F101R8, STM32F101T8, STM32F101V8, STM32F101CB,
      STM32F101RB, STM32F101TB and STM32F101VB */ /* #define
      STM32F101xE */ /*!&lt; STM32F101RC, STM32F101VC, STM32F101ZC,
      STM32F101RD, STM32F101VD, STM32F101ZD, STM32F101RE, STM32F101VE
      and STM32F101ZE */ /* #define STM32F101xG */ /*!&lt;
      STM32F101RF, STM32F101VF, STM32F101ZF, STM32F101RG, STM32F101VG
      and STM32F101ZG */ /* #define STM32F102x6 */ /*!&lt;
      STM32F102C4, STM32F102R4, STM32F102C6 and STM32F102R6 */ /*
      #define STM32F102xB */ /*!&lt; STM32F102C8, STM32F102R8,
      STM32F102CB and STM32F102RB */ /* #define STM32F103x6 */ /*!&lt;
      STM32F103C4, STM32F103R4, STM32F103T4, STM32F103C6, STM32F103R6
      and STM32F103T6 */ /* #define STM32F103xB */ /*!&lt;
      STM32F103C8, STM32F103R8, STM32F103T8, STM32F103V8, STM32F103CB,
      STM32F103RB, STM32F103TB and STM32F103VB */ /* #define
      STM32F103xE */ /*!&lt; STM32F103RC, STM32F103VC, STM32F103ZC,
      STM32F103RD, STM32F103VD, STM32F103ZD, STM32F103RE, STM32F103VE
      and STM32F103ZE */ /* #define STM32F103xG */ /*!&lt;
      STM32F103RF, STM32F103VF, STM32F103ZF, STM32F103RG, STM32F103VG
      and STM32F103ZG */ /* #define STM32F105xC */ /*!&lt;
      STM32F105R8, STM32F105V8, STM32F105RB, STM32F105VB, STM32F105RC
      and STM32F105VC */ /* #define STM32F107xC */ /*!&lt;
      STM32F107RB, STM32F107VB, STM32F107RC and STM32F107VC */ #endif
    </div>
  </div>
  <pre

  >
#if !defined (STM32F100xB) &amp;&amp; !defined (STM32F100xE) &amp;&amp; !defined (STM32F101x6) &amp;&amp; \
!defined (STM32F101xB) &amp;&amp; !defined (STM32F101xE) &amp;&amp; !defined (STM32F101xG) &amp;&amp; !defined (STM32F102x6) &amp;&amp; !defined (STM32F102xB) &amp;&amp; !defined (STM32F103x6) &amp;&amp; \
!defined (STM32F103xB) &amp;&amp; !defined (STM32F103xE) &amp;&amp; !defined (STM32F103xG) &amp;&amp; !defined (STM32F105xC) &amp;&amp; !defined (STM32F107xC)
/* #define STM32F100xB  */   /*!&lt; STM32F100C4, STM32F100R4, STM32F100C6, STM32F100R6, STM32F100C8, STM32F100R8, STM32F100V8, STM32F100CB, STM32F100RB and STM32F100VB */
/* #define STM32F100xE */    /*!&lt; STM32F100RC, STM32F100VC, STM32F100ZC, STM32F100RD, STM32F100VD, STM32F100ZD, STM32F100RE, STM32F100VE and STM32F100ZE */
/* #define STM32F101x6  */   /*!&lt; STM32F101C4, STM32F101R4, STM32F101T4, STM32F101C6, STM32F101R6 and STM32F101T6 Devices */
/* #define STM32F101xB  */   /*!&lt; STM32F101C8, STM32F101R8, STM32F101T8, STM32F101V8, STM32F101CB, STM32F101RB, STM32F101TB and STM32F101VB */
/* #define STM32F101xE */    /*!&lt; STM32F101RC, STM32F101VC, STM32F101ZC, STM32F101RD, STM32F101VD, STM32F101ZD, STM32F101RE, STM32F101VE and STM32F101ZE */ 
/* #define STM32F101xG  */   /*!&lt; STM32F101RF, STM32F101VF, STM32F101ZF, STM32F101RG, STM32F101VG and STM32F101ZG */
/* #define STM32F102x6 */    /*!&lt; STM32F102C4, STM32F102R4, STM32F102C6 and STM32F102R6 */
/* #define STM32F102xB  */   /*!&lt; STM32F102C8, STM32F102R8, STM32F102CB and STM32F102RB */
/* #define STM32F103x6  */   /*!&lt; STM32F103C4, STM32F103R4, STM32F103T4, STM32F103C6, STM32F103R6 and STM32F103T6 */
/* #define STM32F103xB  */   /*!&lt; STM32F103C8, STM32F103R8, STM32F103T8, STM32F103V8, STM32F103CB, STM32F103RB, STM32F103TB and STM32F103VB */
/* #define STM32F103xE */    /*!&lt; STM32F103RC, STM32F103VC, STM32F103ZC, STM32F103RD, STM32F103VD, STM32F103ZD, STM32F103RE, STM32F103VE and STM32F103ZE */
/* #define STM32F103xG  */   /*!&lt; STM32F103RF, STM32F103VF, STM32F103ZF, STM32F103RG, STM32F103VG and STM32F103ZG */
/* #define STM32F105xC */    /*!&lt; STM32F105R8, STM32F105V8, STM32F105RB, STM32F105VB, STM32F105RC and STM32F105VC */
/* #define STM32F107xC  */   /*!&lt; STM32F107RB, STM32F107VB, STM32F107RC and STM32F107VC */  
#endif</pre
  >
  <br />
  Обращаем внимание на строчку:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>/* #define STM32F103xB */</span><span> </span
          ><span
            >/*!&lt; STM32F103C8, STM32F103R8, STM32F103T8,
            STM32F103V8, STM32F103CB, STM32F103RB, STM32F103TB and
            STM32F103VB */</span
          >
        </div>
      </div>
    </div>
    <div>
      /* #define STM32F103xB */ /*!&lt; STM32F103C8, STM32F103R8,
      STM32F103T8, STM32F103V8, STM32F103CB, STM32F103RB, STM32F103TB
      and STM32F103VB */
    </div>
  </div>
  <pre>
/* #define STM32F103xB  */   /*!&lt; STM32F103C8, STM32F103R8, STM32F103T8, STM32F103V8, STM32F103CB, STM32F103RB, STM32F103TB and STM32F103VB */</pre
  >
  <br />
  Ага,&nbsp;STM32F103C8 тут есть. Значит для нашего микроконтроллера
  подойдут исходники, от
  <em>B</em> версии:&nbsp;STM32<strong>F103xB</strong>.&nbsp;Запомним
  это. Из этой папки копируем в CMSIS проекта следующие файлы:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div><span>stm32f1xx.</span><span>h</span></div>
      </div>
      <div>
        <div><span>stm32f103xb.</span><span>h</span></div>
      </div>
      <div>
        <div><span>system_stm32f1xx.</span><span>h</span></div>
      </div>
    </div>
    <div>stm32f1xx.h stm32f103xb.h system_stm32f1xx.h</div>
  </div>
  <pre>
stm32f1xx.h
stm32f103xb.h
system_stm32f1xx.h</pre
  >
  <br />
  Далее переходим в
  <em>.\CMSIS\Device\ST\STM32F1xx\Source\Templates</em> и отсюда
  забираем файл <em>system_stm32f1xx.c</em>

  <p>
    После нам нужен стартап-файл. Заходим в&nbsp;<em
      >.\CMSIS\Device\ST\STM32F1xx\Source\Templates\iar. </em
    >Там нас так же ждет большое количество файлов и мы так же ищем
    тот, который оканчивается на
    <em>xB</em
    >:&nbsp;<em>startup_stm32f103<strong>xb</strong>.s.&nbsp;</em>Копируем
    его в&nbsp;<em>$PROJ_DIR$\CMSIS\.</em>
  </p>
  <p>
    Затем переходим в&nbsp;<em>.\CMSIS\Include&nbsp;</em>и забираем
    вот эти 3 файла:<br />
  </p>
  <div>
    <div></div>
    <div>
      <div>
        <div><span>core_cm3.</span><span>h</span></div>
      </div>
      <div>
        <div><span>core_cmFunc.</span><span>h</span></div>
      </div>
      <div>
        <div><span>core_cmInstr.</span><span>h</span></div>
      </div>
    </div>
    <div>core_cm3.h core_cmFunc.h core_cmInstr.h</div>
  </div>
  <pre>
core_cm3.h
core_cmFunc.h
core_cmInstr.h</pre
  >
  <br />
  Так как в&nbsp;<em>STM32F103C8</em> микропроцессорное ядро
  <em>Cortex M3</em>, то и берем соответствующие исходники.

  <p>Итого 8 файлов:</p>
  <ol>
    <li><em>stm32f1xx.h</em></li>
    <li><em>stm32f103<strong>xb</strong>.h</em></li>
    <li><em>system_stm32f1xx.h</em></li>
    <li><em>system_stm32f1xx.c</em></li>
    <li><em>startup_stm32f103<strong>xb</strong>.s</em></li>
    <li><em>core_cm3.h</em></li>
    <li><em>core_cmFunc.h</em></li>
    <li><em>core_cmInstr.h</em></li>
  </ol>
  <p>
    Вот так это должно выглядеть в папке&nbsp;<em
      >$PROJ_DIR$\CMSIS:</em
    >
  </p>
  <p></p>
  <p>
    Теперь эти файлы надо добавить в обозреватель проекта в IAR-е. Для
    удобства создадим группу с одноименным названием CMSIS. Нажимаем
    правой кнопкой мыши на названии проекта и выбираем
    <em>Add-&gt;Add Group…</em>
  </p>
  <p></p>
  <p>Вводим название группы и нажимаем <em>OK</em>:</p>
  <p></p>
  <p>После этого в группу CMSIS добавляем файлы из папки CMSIS:</p>
  <p></p>
  <p>
    В открывшемся диалоге выбираем все файлы и нажимаем
    <em>Открыть</em>:
  </p>
  <p></p>
  <p>В результате получаем вот это:</p>
  <p></p>
  <p>
    После этого открываем файл&nbsp;stm32f1xx.h и раскомментируем
    стоку с #define STM32F103xB:<br />
  </p>
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span
            >#if !defined (STM32F100xB) &amp;&amp; !defined
            (STM32F100xE) &amp;&amp; !defined (STM32F101x6) &amp;&amp;
            \</span
          >
        </div>
      </div>
      <div>
        <div>
          <span> !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F101xB</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F101xE</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F101xG</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F102x6</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F102xB</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F103x6</span><span>)</span
          ><span> &amp;&amp; \</span>
        </div>
      </div>
      <div>
        <div>
          <span> !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F103xB</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F103xE</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F103xG</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F105xC</span><span>)</span
          ><span> &amp;&amp; !</span><span>defined</span><span> </span
          ><span>(</span><span>STM32F107xC</span><span>)</span>
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F100xB */</span><span> </span
          ><span
            >/*!&lt; STM32F100C4, STM32F100R4, STM32F100C6,
            STM32F100R6, STM32F100C8, STM32F100R8, STM32F100V8,
            STM32F100CB, STM32F100RB and STM32F100VB */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F100xE */</span><span> </span
          ><span
            >/*!&lt; STM32F100RC, STM32F100VC, STM32F100ZC,
            STM32F100RD, STM32F100VD, STM32F100ZD, STM32F100RE,
            STM32F100VE and STM32F100ZE */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F101x6 */</span><span> </span
          ><span
            >/*!&lt; STM32F101C4, STM32F101R4, STM32F101T4,
            STM32F101C6, STM32F101R6 and STM32F101T6 Devices */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F101xB */</span><span> </span
          ><span
            >/*!&lt; STM32F101C8, STM32F101R8, STM32F101T8,
            STM32F101V8, STM32F101CB, STM32F101RB, STM32F101TB and
            STM32F101VB */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F101xE */</span><span> </span
          ><span
            >/*!&lt; STM32F101RC, STM32F101VC, STM32F101ZC,
            STM32F101RD, STM32F101VD, STM32F101ZD, STM32F101RE,
            STM32F101VE and STM32F101ZE */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F101xG */</span><span> </span
          ><span
            >/*!&lt; STM32F101RF, STM32F101VF, STM32F101ZF,
            STM32F101RG, STM32F101VG and STM32F101ZG */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F102x6 */</span><span> </span
          ><span
            >/*!&lt; STM32F102C4, STM32F102R4, STM32F102C6 and
            STM32F102R6 */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F102xB */</span><span> </span
          ><span
            >/*!&lt; STM32F102C8, STM32F102R8, STM32F102CB and
            STM32F102RB */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F103x6 */</span><span> </span
          ><span
            >/*!&lt; STM32F103C4, STM32F103R4, STM32F103T4,
            STM32F103C6, STM32F103R6 and STM32F103T6 */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span
            >#define STM32F103xB /*!&lt; STM32F103C8, STM32F103R8,
            STM32F103T8, STM32F103V8, STM32F103CB, STM32F103RB,
            STM32F103TB and STM32F103VB */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F103xE */</span><span> </span
          ><span
            >/*!&lt; STM32F103RC, STM32F103VC, STM32F103ZC,
            STM32F103RD, STM32F103VD, STM32F103ZD, STM32F103RE,
            STM32F103VE and STM32F103ZE */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F103xG */</span><span> </span
          ><span
            >/*!&lt; STM32F103RF, STM32F103VF, STM32F103ZF,
            STM32F103RG, STM32F103VG and STM32F103ZG */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F105xC */</span><span> </span
          ><span
            >/*!&lt; STM32F105R8, STM32F105V8, STM32F105RB,
            STM32F105VB, STM32F105RC and STM32F105VC */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>/* #define STM32F107xC */</span><span> </span
          ><span
            >/*!&lt; STM32F107RB, STM32F107VB, STM32F107RC and
            STM32F107VC */</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>#endif</span>
        </div>
      </div>
    </div>
    <div>
      #if !defined (STM32F100xB) &amp;&amp; !defined (STM32F100xE)
      &amp;&amp; !defined (STM32F101x6) &amp;&amp; \ !defined
      (STM32F101xB) &amp;&amp; !defined (STM32F101xE) &amp;&amp;
      !defined (STM32F101xG) &amp;&amp; !defined (STM32F102x6)
      &amp;&amp; !defined (STM32F102xB) &amp;&amp; !defined
      (STM32F103x6) &amp;&amp; \ !defined (STM32F103xB) &amp;&amp;
      !defined (STM32F103xE) &amp;&amp; !defined (STM32F103xG)
      &amp;&amp; !defined (STM32F105xC) &amp;&amp; !defined
      (STM32F107xC) /* #define STM32F100xB */ /*!&lt; STM32F100C4,
      STM32F100R4, STM32F100C6, STM32F100R6, STM32F100C8, STM32F100R8,
      STM32F100V8, STM32F100CB, STM32F100RB and STM32F100VB */ /*
      #define STM32F100xE */ /*!&lt; STM32F100RC, STM32F100VC,
      STM32F100ZC, STM32F100RD, STM32F100VD, STM32F100ZD, STM32F100RE,
      STM32F100VE and STM32F100ZE */ /* #define STM32F101x6 */ /*!&lt;
      STM32F101C4, STM32F101R4, STM32F101T4, STM32F101C6, STM32F101R6
      and STM32F101T6 Devices */ /* #define STM32F101xB */ /*!&lt;
      STM32F101C8, STM32F101R8, STM32F101T8, STM32F101V8, STM32F101CB,
      STM32F101RB, STM32F101TB and STM32F101VB */ /* #define
      STM32F101xE */ /*!&lt; STM32F101RC, STM32F101VC, STM32F101ZC,
      STM32F101RD, STM32F101VD, STM32F101ZD, STM32F101RE, STM32F101VE
      and STM32F101ZE */ /* #define STM32F101xG */ /*!&lt;
      STM32F101RF, STM32F101VF, STM32F101ZF, STM32F101RG, STM32F101VG
      and STM32F101ZG */ /* #define STM32F102x6 */ /*!&lt;
      STM32F102C4, STM32F102R4, STM32F102C6 and STM32F102R6 */ /*
      #define STM32F102xB */ /*!&lt; STM32F102C8, STM32F102R8,
      STM32F102CB and STM32F102RB */ /* #define STM32F103x6 */ /*!&lt;
      STM32F103C4, STM32F103R4, STM32F103T4, STM32F103C6, STM32F103R6
      and STM32F103T6 */ #define STM32F103xB /*!&lt; STM32F103C8,
      STM32F103R8, STM32F103T8, STM32F103V8, STM32F103CB, STM32F103RB,
      STM32F103TB and STM32F103VB */ /* #define STM32F103xE */ /*!&lt;
      STM32F103RC, STM32F103VC, STM32F103ZC, STM32F103RD, STM32F103VD,
      STM32F103ZD, STM32F103RE, STM32F103VE and STM32F103ZE */ /*
      #define STM32F103xG */ /*!&lt; STM32F103RF, STM32F103VF,
      STM32F103ZF, STM32F103RG, STM32F103VG and STM32F103ZG */ /*
      #define STM32F105xC */ /*!&lt; STM32F105R8, STM32F105V8,
      STM32F105RB, STM32F105VB, STM32F105RC and STM32F105VC */ /*
      #define STM32F107xC */ /*!&lt; STM32F107RB, STM32F107VB,
      STM32F107RC and STM32F107VC */ #endif
    </div>
  </div>
  <pre>
#if !defined (STM32F100xB) &amp;&amp; !defined (STM32F100xE) &amp;&amp; !defined (STM32F101x6) &amp;&amp; \
!defined (STM32F101xB) &amp;&amp; !defined (STM32F101xE) &amp;&amp; !defined (STM32F101xG) &amp;&amp; !defined (STM32F102x6) &amp;&amp; !defined (STM32F102xB) &amp;&amp; !defined (STM32F103x6) &amp;&amp; \
!defined (STM32F103xB) &amp;&amp; !defined (STM32F103xE) &amp;&amp; !defined (STM32F103xG) &amp;&amp; !defined (STM32F105xC) &amp;&amp; !defined (STM32F107xC)
/* #define STM32F100xB  */   /*!&lt; STM32F100C4, STM32F100R4, STM32F100C6, STM32F100R6, STM32F100C8, STM32F100R8, STM32F100V8, STM32F100CB, STM32F100RB and STM32F100VB */
/* #define STM32F100xE */    /*!&lt; STM32F100RC, STM32F100VC, STM32F100ZC, STM32F100RD, STM32F100VD, STM32F100ZD, STM32F100RE, STM32F100VE and STM32F100ZE */
/* #define STM32F101x6  */   /*!&lt; STM32F101C4, STM32F101R4, STM32F101T4, STM32F101C6, STM32F101R6 and STM32F101T6 Devices */
/* #define STM32F101xB  */   /*!&lt; STM32F101C8, STM32F101R8, STM32F101T8, STM32F101V8, STM32F101CB, STM32F101RB, STM32F101TB and STM32F101VB */
/* #define STM32F101xE */    /*!&lt; STM32F101RC, STM32F101VC, STM32F101ZC, STM32F101RD, STM32F101VD, STM32F101ZD, STM32F101RE, STM32F101VE and STM32F101ZE */ 
/* #define STM32F101xG  */   /*!&lt; STM32F101RF, STM32F101VF, STM32F101ZF, STM32F101RG, STM32F101VG and STM32F101ZG */
/* #define STM32F102x6 */    /*!&lt; STM32F102C4, STM32F102R4, STM32F102C6 and STM32F102R6 */
/* #define STM32F102xB  */   /*!&lt; STM32F102C8, STM32F102R8, STM32F102CB and STM32F102RB */
/* #define STM32F103x6  */   /*!&lt; STM32F103C4, STM32F103R4, STM32F103T4, STM32F103C6, STM32F103R6 and STM32F103T6 */
#define STM32F103xB     /*!&lt; STM32F103C8, STM32F103R8, STM32F103T8, STM32F103V8, STM32F103CB, STM32F103RB, STM32F103TB and STM32F103VB */
/* #define STM32F103xE */    /*!&lt; STM32F103RC, STM32F103VC, STM32F103ZC, STM32F103RD, STM32F103VD, STM32F103ZD, STM32F103RE, STM32F103VE and STM32F103ZE */
/* #define STM32F103xG  */   /*!&lt; STM32F103RF, STM32F103VF, STM32F103ZF, STM32F103RG, STM32F103VG and STM32F103ZG */
/* #define STM32F105xC */    /*!&lt; STM32F105R8, STM32F105V8, STM32F105RB, STM32F105VB, STM32F105RC and STM32F105VC */
/* #define STM32F107xC  */   /*!&lt; STM32F107RB, STM32F107VB, STM32F107RC and STM32F107VC */  
#endif</pre
  >
  <br />
  Далее пишем следующий main:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>#include "stm32f1xx.h"</span>
        </div>
      </div>
      <div></div>
      <div>
        <div><span>int</span> <span>main</span><span>()</span></div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div><span>return</span><span> 0;</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
    </div>
    <div>#include "stm32f1xx.h" int main() { return 0; }</div>
  </div>
  <pre>
#include "stm32f1xx.h"

int main()
{
return 0;
}
</pre
  >
  <br />
  Выбираем <em>Project-&gt;Make</em>. Если все сделали правильно, то
  получаем сообщение об успешной компиляции проекта:`
},
  {
    title: 'Часть 3: Система тактирования',
  content: `
  <p>
    Система тактирования в STM32 в сравнении с микроконтроллерами AVR
    выполнена довольно замысловато. Давайте разбираться.
  </p>
  <h2>Содержание:</h2>
  <ul>
    <li>Шины</li>
    <li>Генераторы</li>
    <li>Тактирование периферии</li>
    <li>Источники сигнала SYSCLK</li>
    <li>HSE и PLL</li>
    <li>Что еще?</li>
    <li>Заключение</li>
  </ul>
  <h2>Шины</h2>
  <p>
    У микроконтроллеров STM32 все периферийные устройства&nbsp;(порты
    ввода-вывода, таймеры, интерфейсы SPI, и т.д.) подключены к так
    называемым <strong>шинам</strong>, через которые
    <strong>периферия </strong>получает
    <strong>тактовый сигнал</strong> и
    <strong>обменивается данными</strong> с ведущими устройствами шины
    (например, с процессором).
  </p>
  <p>
    В STM32F103x8 три основных шины: <em>AHB, APB1 и APB2</em>. На
    каждой из шин висит определенная группа устройств:
  </p>
  <ul>
    <li><em>AHB:</em> процессорное ядро, память и DMA;</li>
    <li>
      <em>APB1:</em> USART2,&nbsp;USART3, I2C1/2, CAN, таймеры
      TIM2..4;
    </li>
    <li><em>APB2:</em> порты GPIO, АЦП, USART1, TIM1, SPI1.</li>
  </ul>
  <p>
    В даташите на&nbsp;STM32F103x8 есть блок-схема, в которой указано,
    какая периферия куда подключена:
  </p>
  <p style="text-align: center">
    <em
      >Рис. 1. Блок-схема микроконтроллеров&nbsp;STM32F103x8
      и&nbsp;STM32F103xB</em
    >
  </p>
  <p>
    Схема на <em>рис. 1</em> поначалу может казаться сложной и
    непонятной, это нормально, со временем все в голове уложится и
    ощущение непонимания исчезнет.
  </p>
  <p>
    А еще есть вот такая таблица, в которой так же указаны
    периферийные устройства и шины, к которым они подключены:
  </p>
  <p></p>
  <p style="text-align: center">
    <em>Рис. 2. Таблица шин и периферийных устройств</em>
  </p>
  <p>
    Можно заметить, что на <em>рис. 2&nbsp;</em>возле названия шины
    (<em>AHB</em>, <em>APB1</em> и <em>APB2</em>) в скобках указана ее
    максимальная частота. Так как периферийные устройства получают
    тактовый сигнал от шины, ее частота задает скорость работы
    подключенных к данной шине устройств. Далее мы рассмотрим, как
    настроить частоту каждой из шин микроконтроллера.
  </p>
  <p>
    Еще одной особенностью системы тактирования STM32 является то, что
    после сигнала сброса микроконтроллера вся периферия находится в
    отключенном состоянии и на нее не подается тактовый сигнал. Это
    сделано с целью снижения энергопотребления всего микроконтроллера.
    Перед началом работы с любым периферийным устройством необходимо
    разрешить подачу на него тактового сигнала. Как это сделать
    рассмотрим далее.
  </p>
  <p>Итак, вот основные тезисы, которые необходимо запомнить:</p>
  <ol>
    <li>
      Все периферийные устройства в микроконтроллерах STM32 подключены
      к шинам (<em>AHB, APB1 </em>и<em> APB2</em>), через которые
      производится взаимодействие с устройствами и подача на них
      тактовых сигналов;
    </li>
    <li>
      Шины микроконтроллера STM32 могут иметь разные частоты
      тактирования;
    </li>
    <li>
      Перед началом работы с периферийным устройством необходимо
      разрешить подачу на него тактового сигнала.
    </li>
  </ol>
  <h2>Генераторы</h2>
  <p>
    В микроконтроллерах&nbsp;STM32F103x8/B присутствует несколько
    генераторов тактового сигнала:
  </p>
  <p></p>
  <p style="text-align: center">
    <em
      >Рис. 3. Блок-схема системы тактирования, красными
      прямоугольниками выделены генераторы тактовых сигналов</em
    >
  </p>
  <p>
    Первый из них — встроенный RC-генератор на 8 МГц, который
    называется
    <strong>High-speed internal&nbsp;(HSI) RC oscillator</strong>.
    После сброса микроконтроллер по-умолчанию тактируется как раз от
    этого генератора. Основным его плюсом является то, что для работы
    генератора не нужны ни какие дополнительные внешние компоненты.
    Однако его минус — плохая стабильность генерируемой частоты: при
    изменении температуры окружающей среды его частота в&nbsp;8 МГц
    будет немного плыть. Для нетребовательных ко временнЫм интервалам
    устройств это может быть не критично, но в некоторых случаях
    данная особенность является недопустимой.
  </p>
  <p>
    Следующий —&nbsp;<strong>High-speed external (HSE)</strong>. Этот
    генератор является альтернативой&nbsp;HSI. Для его работы нужен
    внешний кварцевый резонатор на частоту 4-16 МГц. Его главным
    преимуществом в сравнении с&nbsp;HSI является стабильность
    генерируемой частоты. Так же, при определенной настройке, вывод
    OSC_IN можно подключить к источнику готового прямоугольного
    тактового сигнала без использования резонатора.
  </p>
  <p>
    Далее&nbsp;<strong>Low-speed external (LSE)</strong>. Этот
    генератор так же требует внешнего кварцевого резонатора, но только
    на 32768 Гц.&nbsp;LSE используется только для тактирования
    встроенных часов реального времени RTC, с помощью которых можно
    вести отсчет текущего времени, если это нужно.
  </p>
  <p>
    Последний генератор — это&nbsp;<strong
      >Low-speed internal (LSI) RC oscillator</strong
    >. Это встроенный RC-генератор на 40 КГц. Он не отличается особой
    точностью, однако у него есть очень важная задача: генерация
    тактового сигнала для сторожевого таймера МК, который перезапустит
    систему в случае зависания. А еще от&nbsp;LSI можно тактировать
    RTC, но скорее всего это ни кто делать не будет
  </p>
  <h2>Тактирование периферии</h2>
  <p>
    Процессорное ядро и основная часть периферии использует тактовый
    сигнал <em>SYSCLK</em>.
  </p>
  <p></p>
  <p style="text-align: center">
    <em>Рис. 4. Распределение тактового сигнала SYSCLK</em>
  </p>
  <p>
    После делителя&nbsp;<em>AHB Prescaler&nbsp;</em>тактовый сигнал
    распределяется между шинами микроконтроллера.
    Сигнал&nbsp;<em>HCLK</em>&nbsp;поступает в процессорное ядро,
    память и периферию шины <em><strong>AHB</strong></em
    >.&nbsp;<em>FCLK </em>так же идет в ядро<em>.</em>&nbsp;Через
    фиксированный делитель на 8 тактирование подается на системный
    таймер <em>Cortex System timer</em>. Делитель
    <em>APB1&nbsp;Prescaler&nbsp;</em>формирует сигнал тактирования
    устройств шины&nbsp;<em><strong>APB1</strong></em
    >, а&nbsp;<em>APB2&nbsp;Prescaler&nbsp;</em>для устройств&nbsp;<em
      ><strong>APB2</strong>.&nbsp;</em
    >
  </p>
  <p>
    Тут правда есть небольшая особенность формирования тактового
    сигнала для таймеров и АЦП.
  </p>
  <p></p>
  <p style="text-align: center">
    <em
      >Рис. 5. Распределение тактового сигнала шины APB1 между
      устройствами&nbsp;</em
    >
  </p>
  <p></p>
  <p style="text-align: center">
    <em
      >Рис. 6. Распределение тактового сигнала шины APB2 между
      устройствами&nbsp;</em
    >
  </p>
  <p>
    Тактовый сигнал на таймеры подается следующим образом. Если
    делитель шины (<em>APB1&nbsp;Prescaler </em
    >или&nbsp;<em>APB2&nbsp;Prescaler</em>) установлен в единицу, то
    частота тактирования тактирования таймеров (<em>TIMXCLK</em>
    или&nbsp;<em>TIM1CLK)</em> будет равна частоте шины. Но, если
    делитель не равен единице, то частота тактирования таймеров будет
    в 2 раза больше частоты шины (см. рис. 5, 6). А для АЦП есть свой
    собственный делитель, который из частоты тактирования шины
    <em>APB2</em> формирует сигнал <em>ADCCLK</em>&nbsp;(рис. 6).
  </p>
  <p>
    Думаю, следует еще обратить внимание на вот эти элементы
    блок-схемы:
  </p>
  <p></p>
  <p style="text-align: center"><em>Рис. 7</em></p>
  <p>
    Это есть ни что иное, как устройства подачи тактового сигнала на
    конкретную периферию (логические элементы 2И). Попробую
    перерисовать один из них так, чтоб было понятнее, что это и как
    оно работает:
  </p>
  <p></p>
  <p style="text-align: center"><em>Рис. 8.&nbsp;</em></p>
  <p>
    У каждого периферийного модуля в специальном регистре есть свой
    бит (<em>SPI1EN, IOPAEN, IOABEN</em> и так далее), при установке
    которого в единицу разрешается подача на него тактового сигнала.
    На рис. 8 я привел пример только для тактового сигнала
    <em>PCLK2</em> шины <em>APB2</em>, для остальных сигналов (<em
      >HCLK, PCLK1, TIMXCLK, TIM1CLK</em
    >) все то же самое.
  </p>
  <h2>Источники сигнала SYSCLK</h2>
  <p>
    Итак, теперь мы знаем, что основным тактовым сигналом в
    микроконтроллерах STM32 является <em>SYSCLK</em>. Давайте теперь
    разберемся, как его получить. В нашем распоряжении 3 варианта:
    генераторы <em>HSI</em>, <em>HSE</em> и модуль <em>PLL</em>:
  </p>
  <p></p>
  <p style="text-align: center">
    <em>Рис. 9. Источники сигнала SYSCLK</em>
  </p>
  <p>
    После сброса микроконтроллера в качестве источника сигнала
    <em>SYSCLK</em> по-умолчанию устанавливается встроенный
    RC-генератор <em>HSI</em>. Прохождение тактового сигнала для этого
    случая представлено на рис. 10, значения по-умолчанию&nbsp;всех
    делителей обвел кружочком:
  </p>
  <p></p>
  <p style="text-align: center">
    <em>Рис. 10. Конфигурация системы тактирования по-умолчанию</em>
  </p>
  <p>
    А теперь давайте посчитаем значения всех частот в конфигурации
    по-умолчанию. Частоты
    <em>HCLK, FCLK, PCLK1, TIMXCLK,&nbsp;PCLK2, TIM1CLK</em> будут
    равны 8 МГц, частота <em>Cortex System timer</em>&nbsp;равна 1
    МГц, а <em>ADCCLK</em> 4 Мгц.
  </p>
  <p>
    Если мы хотим задействовать HSE-генератор, то картина будет
    следующей:
  </p>
  <p></p>
  <p style="text-align: center">
    <em
      >Рис. 11. Выбор генератора HSE в качестве источника тактирования
      SYSCLK</em
    >
  </p>
  <p>
    При использовании кварцевого резонатора на 8 МГц все системные
    частоты будут такими же, что и в предыдущем случае. Разница только
    в одном: при использовании генератора <em>HSE</em> стабильность
    частот лучше, чем при использовании&nbsp;HSI. Однако, если мы
    хотим получить максимальную производительность всей системы, то
    нужно в качестве источника <em>SYSCLK</em> использовать блок
    умножения частоты <em>PLL</em>.
  </p>
  <h2>HSE и PLL</h2>
  <p>
    В микроконтроллерах STM32 модуль <em>PLL</em> может тактироваться
    как от <em>HSI</em> генератора, так и от
    <em>HSE</em>.&nbsp;Существует огромное количество вариантов
    настройки тактирования системы от <em>PLL</em>. Мы остановимся
    только на одном, в котором используется&nbsp;<em>HSE</em> и все
    коэффициенты настроены на максимальную производительность системы:
  </p>
  <p></p>
  <p style="text-align: center">
    <em
      >Рис. 12. Схема прохождения тактового сигнала при использовании
      PLL совместно с HSE</em
    >
  </p>
  <p>
    Кварцевый резонатор выбираем на 8 МГц. Далее, сигнал с
    <em>HSE</em> без деления (настраивается битом <em>PLLXTPRE</em>)
    поступает на селектор <em>PLLSRC</em> и потом на <em>PLL</em>. Для
    того, чтобы из 8-и МГц получить 72 МГц, коэффициент умножения
    <em>PLL</em> должен быть равен <em>PLLMUL</em>=9. Далее, сигнал с
    <em>PLL</em> частотой 72 МГц через селектор <em>SW</em> поступает
    на <em>SYSCLK</em>. Так как процессорное ядро мы хотим тактировать
    максимальной частотой в 72 МГц,
    <em>AHB Prescaler</em> устанавливаем равный единице (без деления).
    Для получения частоты шины <em>APB1</em>, равной 36 МГц,
    <em>APB1&nbsp;Prescaler</em> ставим равным 2. Шина
    <em>APB2</em> имеет максимальную частоту 72 МГц,
    следовательно,&nbsp;<em>APB2 Prescaler</em> можно установить в 1.
  </p>
  <p>Итого:</p>
  <ul>
    <li>Кварц HSE на 8 МГц</li>
    <li>PLLXTPRE: без деления</li>
    <li>PLLSRC: HSE генератор</li>
    <li>PLLMUL = 9</li>
    <li>SW = PLLCLK</li>
    <li>AHB Prescaler = 1</li>
    <li>APB1&nbsp;Prescaler = 2</li>
    <li>APB2 Prescaler = 1</li>
  </ul>
  <h2>Что еще?</h2>
  <p>
    Здесь мы не рассмотрели еще некоторые блоки системы тактирования,
    о которых хочется упомянуть.
  </p>
  <p>
    <em>Clock security system (CSS)</em> — переводится примерно как
    «система безопасности тактирования». Если, при использовании
    генератора HSE в качестве источника тактового сигнала для SYSCLK
    или PLL, произойдет срыв генерации&nbsp;HSE, то CSS автоматически
    переключит всю систему на работу от встроенного RC-генератора HSI.
    Таким образом, если что-то случится с кварцем, система не зависнет
    намертво в неопределенном состоянии, а сможет выполнить какие-то
    действия, например, перевести объект управления в безопасное
    состояние (закрыть все вентили, отключить силовые установки, и
    т.д.)
  </p>
  <p>
    Модуль часов реального времени <em>RTC</em> может тактироваться от
    встроенного <em>LSI</em> генератора на 40 КГц, от
    <em>HSE</em> через делитель на 128, либо от <em>LSE</em> с внешним
    кварцем на 32768 Гц. Источник тактовых импульсов выбирается с
    помощью <em>RTCSEL</em>.
  </p>
  <p>
    Модуль USB получает тактовый сигнал от <em>PLL</em>, причем при
    частоте на выходе <em>PLL</em> равной 72 МГц есть возможность
    активировать U<em>SB Prescaler</em> с коэффициентом деления 1.5
    для получения необходимой частоты 48 МГц.
  </p>
  <p>
    <em>Microcontroller clock output (MCO)</em> — вывод
    микроконтроллера, на который можно вывести частоту от одного из
    источников сигнала: <em>SYSCLK, HSE, HSI</em> либо сигнал с выхода
    <em>PLL</em>, поделенный пополам. Нужный источник выбирается с
    помощью битов <em>MCO</em>.
  </p>
  <h2>Заключение</h2>
  <p>
    Итак, мы рассмотрели основные моменты в системе тактирования
    микроконтроллеров STM32 на примере STM32F103x8 и&nbsp;STM32F103xB.
    В других микроконтроллерах STM32 примерно все то же самое, за
    исключением некоторых нюансов. В следующей части мы познакомимся с
    регистрами системы тактирования и сброса <em>RCC</em> и рассмотрим
    пример инициализации <em>RCC</em>.
  </p>`
},
  {
    title: 'Настройка RCC',
  content: `
  <h2>Регистры&nbsp;CR и&nbsp;CFGR</h2>
  <p>
    Открываем&nbsp;Reference manual на микроконтроллер STM32F103x8 и
    переходим к разделу&nbsp;7:
    <em
      >Low-, medium-, high- and XL-density reset and clock control
      (RCC).&nbsp;RCC</em
    >
    имеет довольно много регистров, целых 10 штук. Однако, для
    настройки источника тактирования и делителей шин нам понадобится
    только 2 из них.
  </p>
  <p><strong>Clock control register (RCC_CR)</strong></p>
  <p></p>
  <p style="text-align: center">
    <em>Рис. 1. Биты регистра&nbsp;CR</em>
  </p>
  <p>Описание основных битов регистра:</p>
  <p>
    <strong>PLLRDY</strong> — флаг готовности PLL. Устанавливается
    аппаратно и сигнализирует о том, что PLL заблокирован.
  </p>
  <p>
    <strong>PLLON</strong> — Включить PLL. Устанавливается и
    сбрасывается программно. При переходе в режим&nbsp;Stop
    или&nbsp;Standby сбрасывается аппаратно. Этот бит не может быть
    сброшен, если PLL используется как источник системного
    тактирования.
  </p>
  <p><strong>CSSON</strong> — включить систему CSS</p>
  <p>
    <strong>HSEBYP</strong> — Если вместо кварцевого резонатора
    HSE&nbsp;мы хотим использовать внешний прямоугольный тактовый
    сигнал, то этот бит нужно установить в 1
  </p>
  <p>
    <strong>HSERDY</strong> — Флаг готовности генератора&nbsp;HSE.
    Аппаратно устанавливается в 1 после успешного запуска и
    стабилизации частоты&nbsp;HSE-генератора
  </p>
  <p>
    <strong>HSEON</strong> — Запустить&nbsp;HSE генератор.
    Устанавливается и сбрасывается программно.&nbsp;При переходе в
    режим&nbsp;Stop или&nbsp;Standby сбрасывается аппаратно и HSE
    генератор останавливается.&nbsp;&nbsp;Этот бит не может быть
    сброшен, если HSE используется как источник системного
    тактирования.
  </p>
  <p>
    <strong>HSIRDY</strong> — то же самое, что и&nbsp;HSERDY, только
    для встроенного RC-генератора HSI
  </p>
  <p>
    <strong>HSION</strong> —&nbsp;то же самое, что и HSEON, только для
    встроенного RC-генератора HSI
  </p>
  <p>&nbsp;</p>
  <p><strong>Clock configuration register (RCC_CFGR)</strong></p>
  <p></p>
  <p style="text-align: center">
    <em>Рис. 2. Биты регистра CFGR</em>
  </p>
  <p>Описание основных битов регистра:</p>
  <p>
    <strong>MCO</strong> — подача тактового сигнала
    на&nbsp;MCO-пин&nbsp;микроконтроллера.
  </p>
  <ul>
    <li>0xx: Функция отключена</li>
    <li>100: Выбран System clock (SYSCLK)</li>
    <li>101: Выбран сигнал с HSI</li>
    <li>110: Выбран сигнал с HSE</li>
    <li>111: Выбран сигнал с PLL, который поделен на 2</li>
  </ul>
  <p>
    <strong>PLLMUL</strong> — коэффициент умножения PLL. Эти биты
    могут быть записаны программно только при отключенном PLL
  </p>
  <ul>
    <li>0000: Входную частота PLL умножить на 2</li>
    <li>0001: —//— на 3</li>
    <li>0010: —//— на 4</li>
    <li>0011: —//— на&nbsp;5</li>
    <li>0100: —//— на 6</li>
    <li>0101: —//— на 7</li>
    <li>0110: —//— на 8</li>
    <li>0111: —//— на 9</li>
    <li>1000: —//— на 10</li>
    <li>1001:&nbsp;—//— на 11</li>
    <li>1010: —//— на 12</li>
    <li>1011: —//— на 13</li>
    <li>1100: —//— на 14</li>
    <li>1101: —//— на 15</li>
    <li>1110: —//— на 16</li>
    <li>1111: —//— на 16</li>
  </ul>
  <p>
    Два последних значения соответствуют одинаковому коэффициенту
    умножения.
  </p>
  <p>
    <strong>PLLXTPRE</strong> — Делитель частоты с HSE генератора
    перед подачей на PLL. Этот бит не может быть изменен, если PLL
    запущен. При установке в 1 частота HSE будет поделена на 2, если
    0, то делитель отключен.
  </p>
  <p>
    <strong>PLLSRC</strong> — Источник входной частоты PLL. Не может
    быть изменен,&nbsp;если PLL запущен.
  </p>
  <ul>
    <li>0: частота HSI генератора поделенная на 2</li>
    <li>
      1: частота HSE генератора. Делитель может быть
      выбран&nbsp;PLLXTPRE битом.
    </li>
  </ul>
  <p>
    <strong>PPRE2</strong> — Делитель шины&nbsp;<em
      >APB2&nbsp;prescaler</em
    >
  </p>
  <ul>
    <li>0xx: HCLK без деления</li>
    <li>100: HCLK / 2</li>
    <li>101: HCLK / 4</li>
    <li>110: HCLK / 8</li>
    <li>111: HCLK / 16</li>
  </ul>
  <p>
    <strong>PPRE1</strong> — Делитель шины&nbsp;<em
      >APB1&nbsp;prescaler. </em
    >Частота шины&nbsp;APB1 не должна превышать 36 МГц.
  </p>
  <ul>
    <li>0xx: HCLK без деления</li>
    <li>100: HCLK / 2</li>
    <li>101: HCLK / 4</li>
    <li>110: HCLK / 8</li>
    <li>111: HCLK / 16</li>
  </ul>
  <p><strong>HPRE</strong> —&nbsp;AHB prescaler</p>
  <ul>
    <li>0xxx: SYSCLK без деления</li>
    <li>1000: SYSCLK / 2</li>
    <li>1001: SYSCLK / 4</li>
    <li>1010: SYSCLK / 8</li>
    <li>1011: SYSCLK / 16</li>
    <li>1100: SYSCLK / 64</li>
    <li>1101: SYSCLK / 128</li>
    <li>1110: SYSCLK / 256</li>
    <li>1111: SYSCLK / 512</li>
  </ul>
  <p>
    <strong>SWS</strong> —&nbsp;Состояние переключателя тактирования
    системы. Устанавливается аппаратно и указывает на текущий источник
    тактирования.
  </p>
  <ul>
    <li>
      00: HSI генератор используется как источник тактирования системы
    </li>
    <li>
      01: HSE генератор используется как источник тактирования системы
    </li>
    <li>
      10: PLL&nbsp;используется как источник тактирования системы
    </li>
  </ul>
  <p>
    <strong>SW</strong> — Переключатель источника тактирования
    системы. Изменяется программно для выбора источника&nbsp;SYSCLK.
    Устанавливается аппаратно для принудительного переключения
    на&nbsp;HSI генератор переходе в режим&nbsp;Stop или&nbsp;Standby
    или в случае срыва генерации&nbsp;HSE, который используется в
    качестве источника&nbsp;SYSCLK (только если активна система CSS)
  </p>
  <ul>
    <li>
      00: HSI выбран в качестве источника системного тактирования
    </li>
    <li>
      01: HSE выбран в качестве источника системного тактирования
    </li>
    <li>
      10: PLL выбран в качестве источника системного тактирования
    </li>
  </ul>
  <p></p>
  <h2>Коэффициенты</h2>
  <p>
    <a>В предыдущей части</a>
    мы рассмотрели вариант тактирования системы тактирования от
    <em>HSE</em> генератора через <em>PLL</em>, для удобства скопирую
    это сюда:
  </p>
  <ul>
    <li>Кварц HSE на 8 МГц</li>
    <li>PLLXTPRE: без деления</li>
    <li>PLLSRC: HSE генератор</li>
    <li>PLLMUL = 9</li>
    <li>SW = PLLCLK</li>
    <li>AHB Prescaler = 1</li>
    <li>APB1&nbsp;Prescaler = 2</li>
    <li>APB2 Prescaler = 1</li>
  </ul>
  <p>И картинку тоже:</p>
  <p></p>
  <p style="text-align: center">
    <em
      >Рис. 3. Схема прохождения тактового сигнала при использовании
      PLL совместно с HSE</em
    >
  </p>
  <p><a></a></p>
  <h2>Регистры в CMSIS</h2>
  <p>
    Во
    <a>второй части</a>
    мы учились подключать библиотеку <em>CMSIS</em> к IAR-у, сейчас
    нам понадобится этот проект, так как мы переходим к практике. Но
    перед этим немного поговорим о том, как устроено обращение к
    регистрам периферии в CMSIS.
  </p>
  <p>
    Каждый экземпляр периферии является структурой, в которой
    находятся все регистры, относящиеся к данному устройству. Почти во
    всех случаях имя структуры совпадает с именем периферийного
    модуля. Для микроконтроллера STM32F103C8 все структуры
    периферийных модулей объявлены в файле&nbsp;<em>stm32f103xb.h:</em
    ><br />
  </p>
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>#define TIM2 ((TIM_TypeDef *)TIM2_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define TIM3 ((TIM_TypeDef *)TIM3_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define TIM4 ((TIM_TypeDef *)TIM4_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define RTC ((RTC_TypeDef *)RTC_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define WWDG ((WWDG_TypeDef *)WWDG_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define IWDG ((IWDG_TypeDef *)IWDG_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define SPI2 ((SPI_TypeDef *)SPI2_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define USART2 ((USART_TypeDef *)USART2_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define USART3 ((USART_TypeDef *)USART3_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define I2C1 ((I2C_TypeDef *)I2C1_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define I2C2 ((I2C_TypeDef *)I2C2_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define USB ((USB_TypeDef *)USB_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define CAN1 ((CAN_TypeDef *)CAN1_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define BKP ((BKP_TypeDef *)BKP_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define PWR ((PWR_TypeDef *)PWR_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define AFIO ((AFIO_TypeDef *)AFIO_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define EXTI ((EXTI_TypeDef *)EXTI_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define GPIOA ((GPIO_TypeDef *)GPIOA_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define GPIOB ((GPIO_TypeDef *)GPIOB_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define GPIOC ((GPIO_TypeDef *)GPIOC_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define GPIOD ((GPIO_TypeDef *)GPIOD_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define GPIOE ((GPIO_TypeDef *)GPIOE_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define ADC1 ((ADC_TypeDef *)ADC1_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define ADC2 ((ADC_TypeDef *)ADC2_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span
            >#define ADC12_COMMON ((ADC_Common_TypeDef
            *)ADC1_BASE)</span
          >
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define TIM1 ((TIM_TypeDef *)TIM1_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define SPI1 ((SPI_TypeDef *)SPI1_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define USART1 ((USART_TypeDef *)USART1_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define SDIO ((SDIO_TypeDef *)SDIO_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define DMA1 ((DMA_TypeDef *)DMA1_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span
            >#define DMA1_Channel1 ((DMA_Channel_TypeDef
            *)DMA1_Channel1_BASE)</span
          >
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span
            >#define DMA1_Channel2 ((DMA_Channel_TypeDef
            *)DMA1_Channel2_BASE)</span
          >
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span
            >#define DMA1_Channel3 ((DMA_Channel_TypeDef
            *)DMA1_Channel3_BASE)</span
          >
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span
            >#define DMA1_Channel4 ((DMA_Channel_TypeDef
            *)DMA1_Channel4_BASE)</span
          >
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span
            >#define DMA1_Channel5 ((DMA_Channel_TypeDef
            *)DMA1_Channel5_BASE)</span
          >
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span
            >#define DMA1_Channel6 ((DMA_Channel_TypeDef
            *)DMA1_Channel6_BASE)</span
          >
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span
            >#define DMA1_Channel7 ((DMA_Channel_TypeDef
            *)DMA1_Channel7_BASE)</span
          >
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define RCC ((RCC_TypeDef *)RCC_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define CRC ((CRC_TypeDef *)CRC_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define FLASH ((FLASH_TypeDef *)FLASH_R_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span><span>#define OB ((OB_TypeDef *)OB_BASE)</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>#define DBGMCU ((DBGMCU_TypeDef *)DBGMCU_BASE)</span>
        </div>
      </div>
    </div>
    <div>
      #define TIM2 ((TIM_TypeDef *)TIM2_BASE) #define TIM3
      ((TIM_TypeDef *)TIM3_BASE) #define TIM4 ((TIM_TypeDef
      *)TIM4_BASE) #define RTC ((RTC_TypeDef *)RTC_BASE) #define WWDG
      ((WWDG_TypeDef *)WWDG_BASE) #define IWDG ((IWDG_TypeDef
      *)IWDG_BASE) #define SPI2 ((SPI_TypeDef *)SPI2_BASE) #define
      USART2 ((USART_TypeDef *)USART2_BASE) #define USART3
      ((USART_TypeDef *)USART3_BASE) #define I2C1 ((I2C_TypeDef
      *)I2C1_BASE) #define I2C2 ((I2C_TypeDef *)I2C2_BASE) #define USB
      ((USB_TypeDef *)USB_BASE) #define CAN1 ((CAN_TypeDef
      *)CAN1_BASE) #define BKP ((BKP_TypeDef *)BKP_BASE) #define PWR
      ((PWR_TypeDef *)PWR_BASE) #define AFIO ((AFIO_TypeDef
      *)AFIO_BASE) #define EXTI ((EXTI_TypeDef *)EXTI_BASE) #define
      GPIOA ((GPIO_TypeDef *)GPIOA_BASE) #define GPIOB ((GPIO_TypeDef
      *)GPIOB_BASE) #define GPIOC ((GPIO_TypeDef *)GPIOC_BASE) #define
      GPIOD ((GPIO_TypeDef *)GPIOD_BASE) #define GPIOE ((GPIO_TypeDef
      *)GPIOE_BASE) #define ADC1 ((ADC_TypeDef *)ADC1_BASE) #define
      ADC2 ((ADC_TypeDef *)ADC2_BASE) #define ADC12_COMMON
      ((ADC_Common_TypeDef *)ADC1_BASE) #define TIM1 ((TIM_TypeDef
      *)TIM1_BASE) #define SPI1 ((SPI_TypeDef *)SPI1_BASE) #define
      USART1 ((USART_TypeDef *)USART1_BASE) #define SDIO
      ((SDIO_TypeDef *)SDIO_BASE) #define DMA1 ((DMA_TypeDef
      *)DMA1_BASE) #define DMA1_Channel1 ((DMA_Channel_TypeDef
      *)DMA1_Channel1_BASE) #define DMA1_Channel2
      ((DMA_Channel_TypeDef *)DMA1_Channel2_BASE) #define
      DMA1_Channel3 ((DMA_Channel_TypeDef *)DMA1_Channel3_BASE)
      #define DMA1_Channel4 ((DMA_Channel_TypeDef
      *)DMA1_Channel4_BASE) #define DMA1_Channel5
      ((DMA_Channel_TypeDef *)DMA1_Channel5_BASE) #define
      DMA1_Channel6 ((DMA_Channel_TypeDef *)DMA1_Channel6_BASE)
      #define DMA1_Channel7 ((DMA_Channel_TypeDef
      *)DMA1_Channel7_BASE) #define RCC ((RCC_TypeDef *)RCC_BASE)
      #define CRC ((CRC_TypeDef *)CRC_BASE) #define FLASH
      ((FLASH_TypeDef *)FLASH_R_BASE) #define OB ((OB_TypeDef
      *)OB_BASE) #define DBGMCU ((DBGMCU_TypeDef *)DBGMCU_BASE)
    </div>
  </div>
  <pre>
#define TIM2                ((TIM_TypeDef *)TIM2_BASE)
#define TIM3                ((TIM_TypeDef *)TIM3_BASE)
#define TIM4                ((TIM_TypeDef *)TIM4_BASE)
#define RTC                 ((RTC_TypeDef *)RTC_BASE)
#define WWDG                ((WWDG_TypeDef *)WWDG_BASE)
#define IWDG                ((IWDG_TypeDef *)IWDG_BASE)
#define SPI2                ((SPI_TypeDef *)SPI2_BASE)
#define USART2              ((USART_TypeDef *)USART2_BASE)
#define USART3              ((USART_TypeDef *)USART3_BASE)
#define I2C1                ((I2C_TypeDef *)I2C1_BASE)
#define I2C2                ((I2C_TypeDef *)I2C2_BASE)
#define USB                 ((USB_TypeDef *)USB_BASE)
#define CAN1                ((CAN_TypeDef *)CAN1_BASE)
#define BKP                 ((BKP_TypeDef *)BKP_BASE)
#define PWR                 ((PWR_TypeDef *)PWR_BASE)
#define AFIO                ((AFIO_TypeDef *)AFIO_BASE)
#define EXTI                ((EXTI_TypeDef *)EXTI_BASE)
#define GPIOA               ((GPIO_TypeDef *)GPIOA_BASE)
#define GPIOB               ((GPIO_TypeDef *)GPIOB_BASE)
#define GPIOC               ((GPIO_TypeDef *)GPIOC_BASE)
#define GPIOD               ((GPIO_TypeDef *)GPIOD_BASE)
#define GPIOE               ((GPIO_TypeDef *)GPIOE_BASE)
#define ADC1                ((ADC_TypeDef *)ADC1_BASE)
#define ADC2                ((ADC_TypeDef *)ADC2_BASE)
#define ADC12_COMMON        ((ADC_Common_TypeDef *)ADC1_BASE)
#define TIM1                ((TIM_TypeDef *)TIM1_BASE)
#define SPI1                ((SPI_TypeDef *)SPI1_BASE)
#define USART1              ((USART_TypeDef *)USART1_BASE)
#define SDIO                ((SDIO_TypeDef *)SDIO_BASE)
#define DMA1                ((DMA_TypeDef *)DMA1_BASE)
#define DMA1_Channel1       ((DMA_Channel_TypeDef *)DMA1_Channel1_BASE)
#define DMA1_Channel2       ((DMA_Channel_TypeDef *)DMA1_Channel2_BASE)
#define DMA1_Channel3       ((DMA_Channel_TypeDef *)DMA1_Channel3_BASE)
#define DMA1_Channel4       ((DMA_Channel_TypeDef *)DMA1_Channel4_BASE)
#define DMA1_Channel5       ((DMA_Channel_TypeDef *)DMA1_Channel5_BASE)
#define DMA1_Channel6       ((DMA_Channel_TypeDef *)DMA1_Channel6_BASE)
#define DMA1_Channel7       ((DMA_Channel_TypeDef *)DMA1_Channel7_BASE)
#define RCC                 ((RCC_TypeDef *)RCC_BASE)
#define CRC                 ((CRC_TypeDef *)CRC_BASE)
#define FLASH               ((FLASH_TypeDef *)FLASH_R_BASE)
#define OB                  ((OB_TypeDef *)OB_BASE)
#define DBGMCU              ((DBGMCU_TypeDef *)DBGMCU_BASE)</pre
  >
  <br />
  Рассмотрим, как выполняется обращение к регистрам из программы на
  Си. Например, нам надо в регистре&nbsp;<em>RCC_CR</em> установить
  бит&nbsp;<em>HSEON</em>. Это можно сделать одним из следующих
  способов:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>RCC-</span><span>&gt;</span
          ><span>CR |= RCC_CR_HSEON_Msk;</span>
        </div>
      </div>
    </div>
    <div>RCC-&gt;CR |= RCC_CR_HSEON_Msk;</div>
  </div>
  <pre>RCC-&gt;CR |= RCC_CR_HSEON_Msk;</pre>
  <br />
  или так:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>RCC-</span><span>&gt;</span><span>CR |= </span
          ><span>(</span><span>1 </span><span>&lt;&lt;</span
          ><span> RCC_CR_HSEON_Pos</span><span>)</span><span>;</span>
        </div>
      </div>
    </div>
    <div>RCC-&gt;CR |= (1 &lt;&lt; RCC_CR_HSEON_Pos);</div>
  </div>
  <pre>RCC-&gt;CR |= (1 &lt;&lt; RCC_CR_HSEON_Pos);</pre>
  <br />
  Думаю, те, кто раньше программировал для микроконтроллеров AVR
  увидят в этих записях что-то знакомое. Рассмотрим первый случай:

  <p></p>
  <p>
    Сначала идет имя периферийного модуля, в нашем случае «RCC». Затем
    символ «-&gt;», после чего имя регистра
    «CR».&nbsp;&nbsp;RCC_CR_HSEON_Msk представляет собой вот такой
    #define:<br />
  </p>
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>#define RCC_CR_HSEON_Msk (1&lt;&lt;16)</span>
        </div>
      </div>
    </div>
    <div>#define RCC_CR_HSEON_Msk (1&lt;&lt;16)</div>
  </div>
  <pre>#define RCC_CR_HSEON_Msk    (1&lt;&lt;16)</pre>
  <br />
  где 16 — номер бита&nbsp;<em>HSEON</em> в регистре&nbsp;<em>CR</em>
  (см. рис. 1). <em>RCC_CR_HSEON_Msk</em> есть ни что иное, как
  битовая маска, имя которой состоит из названия периферийного модуля,
  имени регистра и бита, а так же постфикса <em>_Msk</em>. В CMSIS
  есть еще один #define, который является синонимом
  <em>RCC_CR_HSEON_Msk</em>:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>#define RCC_CR_HSEON RCC_CR_HSEON_Msk</span>
        </div>
      </div>
    </div>
    <div>#define RCC_CR_HSEON RCC_CR_HSEON_Msk</div>
  </div>
  <pre>#define RCC_CR_HSEON    RCC_CR_HSEON_Msk</pre>
  <br />
  По факту все то же самое, только без <em>_Msk.</em>

  <p>Второй случай выглядит аналогичным образом:</p>
  <p></p>
  <p>где<br /></p>
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>#define RCC_CR_HSEON_Pos 16</span>
        </div>
      </div>
    </div>
    <div>#define RCC_CR_HSEON_Pos 16</div>
  </div>
  <pre>#define RCC_CR_HSEON_Pos    16</pre>
  <br />
  То есть,&nbsp;<em>RCC_CR_HSEON_Pos</em> является позицией бита в
  регистре, о чем говорит постфикс <em>_Pos</em>.

  <p>
    А как быть с параметрами, которые имеют несколько битов? К примеру
    в регистре&nbsp;<em>CFGR</em> мы хотим установить значение
    множителя <em>PLL</em> равное девяти, имеющее код 0111 (см. рис. 2
    биты&nbsp;<em>PLLMUL</em>). Тут вот такое решение:<br />
  </p>
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>RCC-</span><span>&gt;</span
          ><span
            >CFGR |= RCC_CFGR_PLLMULL_0 | RCC_CFGR_PLLMULL_1 |
            RCC_CFGR_PLLMULL_2;</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>RCC-</span><span>&gt;</span><span>CFGR &amp;= ~</span
          ><span>(</span><span>RCC_CFGR_PLLMULL_3</span><span>)</span
          ><span>;</span>
        </div>
      </div>
    </div>
    <div>
      RCC-&gt;CFGR |= RCC_CFGR_PLLMULL_0 | RCC_CFGR_PLLMULL_1 |
      RCC_CFGR_PLLMULL_2; RCC-&gt;CFGR &amp;= ~(RCC_CFGR_PLLMULL_3);
    </div>
  </div>
  <pre>
RCC-&gt;CFGR |= RCC_CFGR_PLLMULL_0 | RCC_CFGR_PLLMULL_1 | RCC_CFGR_PLLMULL_2;
RCC-&gt;CFGR &amp;= ~(RCC_CFGR_PLLMULL_3);</pre
  >
  <br />
  Первой строчкой мы устанавливаем биты 0, 1 и 2&nbsp;<em>PLLMUL</em>
  в единицы, второй строчкой сбрасываем бит 3 в ноль, в итоге
  получаем&nbsp;0111. Однако, если мы уверены, что все биты&nbsp;<em
    >PLLMUL</em
  >
  изначально установлены в нули, то вторую строчку мы можем
  пропустить:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>RCC-</span><span>&gt;</span
          ><span
            >CFGR |= RCC_CFGR_PLLMULL_0 | RCC_CFGR_PLLMULL_1 |
            RCC_CFGR_PLLMULL_2;</span
          >
        </div>
      </div>
    </div>
    <div>
      RCC-&gt;CFGR |= RCC_CFGR_PLLMULL_0 | RCC_CFGR_PLLMULL_1 |
      RCC_CFGR_PLLMULL_2;
    </div>
  </div>
  <pre>
RCC-&gt;CFGR |= RCC_CFGR_PLLMULL_0 | RCC_CFGR_PLLMULL_1 | RCC_CFGR_PLLMULL_2;</pre
  >
  <br />
  А есть и еще один вариант: значение 0111 в десятичном виде является
  числом 7. Тогда можно сделать вот так:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>RCC-</span><span>&gt;</span><span>CFGR |= </span
          ><span>(</span><span>7 </span><span>&lt;&lt;</span
          ><span> RCC_CFGR_PLLMULL_Pos</span><span>)</span
          ><span>;</span>
        </div>
      </div>
    </div>
    <div>RCC-&gt;CFGR |= (7 &lt;&lt; RCC_CFGR_PLLMULL_Pos);</div>
  </div>
  <pre>RCC-&gt;CFGR |= (7 &lt;&lt; RCC_CFGR_PLLMULL_Pos);</pre>
  <br />
  Но и тут надо помнить, что такая запись справедлива только в случае,
  если изначальное значение всех битов&nbsp;<em>PLLMUL</em> равны
  нулям.<br />

  <h2>Настройка</h2>
  <p>
    Для правильной настройки системы тактирования в микроконтроллерах
    STM32 необходимо соблюдать определенную последовательность запуска
    блоков. Если мы хотим переключить систему с внутреннего
    RC-генератора на <em>HSE</em> через <em>PLL</em>, то необходимо
    провести следующие операции вот в таком порядке:
  </p>
  <ol>
    <li>Запустить генератор&nbsp;HSE</li>
    <li>Настроить PLL</li>
    <li>Запустить PLL</li>
    <li>Настроить количество циклов ожидания FLASH</li>
    <li>Настроить делители шин</li>
    <li>Переключиться на работу от PLL</li>
  </ol>
  <p>
    Так, вроде все понятно, хотя… А что это за 4-й пункт? Что за циклы
    ожидания <em>FLASH</em>? Вот здесь кроется один неочевидный
    момент. Дело в том, что <em>FLASH</em>-память микроконтроллера, в
    которой хранится управляющая программа, может работать на
    максимальной частоте 24 МГц. Обмен данными с
    <em>FLASH</em> осуществляется через шину <em>AHB</em> (см. рис.
    3). А если частота шины&nbsp;<em>AHB</em> выше 24 МГц, но
    необходимо ввести циклы ожидания обращений к этой памяти, примем,
    чем выше частота, тем больше этих циклов надо:
  </p>
  <ul>
    <li>ноль циклов ожидания, если 0 &lt; SYSCLK ≤ 24 MHz</li>
    <li>один цикл ожидания, если 24 MHz &lt; SYSCLK ≤ 48 MHz</li>
    <li>два цикла ожидания, если 48 MHz &lt; SYSCLK ≤ 72 MHz</li>
  </ul>
  <p>Надеюсь, с этим все ясно.</p>
  <p>Хочу отметить, что порядок настройки может быть и таким:</p>
  <ol>
    <li>Настроить количество циклов ожидания FLASH</li>
    <li>Настроить делители шин</li>
    <li>Запустить генератор&nbsp;HSE</li>
    <li>Настроить PLL</li>
    <li>Запустить PLL</li>
    <li>Переключиться на работу от PLL</li>
  </ol>
  <p>
    Просто надо помнить, что мы сидим на ветке, которую пилим, и важно
    все отпилить и подставить в нужной последовательности, чтоб не
    упасть. В случае с STM32, «упасть» не получится, так как в этих
    микроконтроллерах реализована аппаратная защита от неправильной
    последовательности действий: мы не сможем остановить генератор, от
    которого сейчас работаем или переключиться на источник тактового
    сигнала, если он еще не запущен. Так что в худшем случае у нас
    просто ни чего не получится, что то же является не очень приятным.
  </p>
  <p>
    Итак, поехали! Возьмем за основу проект, который мы создали во 2-й
    части, когда подключали CMSIS
  </p>
  <p>
    Создадим функцию, в которую будем добавлять код инициализации:<br />
  </p>
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>int</span> <span>ClockInit</span><span>(</span
          ><span>void</span><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
    </div>
    <div>int ClockInit(void) { }</div>
  </div>
  <pre>
int ClockInit(void)
{
}</pre
  >
  <br />
  Первым делом запускаем генератор <em>HSE</em>:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>RCC-</span><span>&gt;</span><span>CR |= </span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_HSEON_Pos</span><span>)</span><span>; </span
          ><span>//Запускаем генератор HSE</span>
        </div>
      </div>
    </div>
    <div>
      RCC-&gt;CR |= (1&lt;&lt;RCC_CR_HSEON_Pos); //Запускаем генератор
      HSE
    </div>
  </div>
  <pre>
RCC-&gt;CR |= (1&lt;&lt;RCC_CR_HSEON_Pos); //Запускаем генератор HSE</pre
  >
  <br />
  После этого нам надо дождаться установки флага&nbsp;<em>HSERDY</em>,
  который указывает на успешный запуск генератора. Можно это сделать
  по-простому с помощью цикла <em>while() {}</em>, но тогда мы рискуем
  зависнуть в нем навсегда, если что-то случится с кварцевым
  резонатором. Хотелось бы иметь возможность каким-то образом
  сигнализировать о невозможности запуска. Вот моя реализация:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span> __IO int StartUpCounter;</span>
        </div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span
            >//Ждем успешного запуска или окончания тайм-аута</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>for</span><span>(</span><span>StartUpCounter=</span
          ><span>0</span><span>; </span><span>;</span
          ><span> StartUpCounter++</span><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div>
          <span>//Если успешно запустилось, то </span>
        </div>
      </div>
      <div>
        <div><span>//выходим из цикла</span></div>
      </div>
      <div>
        <div>
          <span>if</span><span>(</span><span>RCC-</span
          ><span>&gt;</span><span>CR </span><span>&amp;</span
          ><span> </span><span>(</span><span>1</span
          ><span>&lt;&lt;</span><span>RCC_CR_HSERDY_Pos</span
          ><span>))</span>
        </div>
      </div>
      <div>
        <div><span> break;</span></div>
      </div>
      <div></div>
      <div>
        <div><span>//Если не запустилось, то</span></div>
      </div>
      <div>
        <div>
          <span>//отключаем все, что включили</span>
        </div>
      </div>
      <div>
        <div><span>//и возвращаем ошибку</span></div>
      </div>
      <div>
        <div>
          <span>if</span><span>(</span><span>StartUpCounter </span
          ><span>&gt;</span><span> </span><span>0x1000</span
          ><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CR &amp;= ~</span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_HSEON_Pos</span><span>)</span><span>; </span
          ><span>//Останавливаем HSE</span>
        </div>
      </div>
      <div>
        <div>
          <span>return</span><span> </span><span>1</span
          ><span>;</span>
        </div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
    </div>
    <div>
      __IO int StartUpCounter; //Ждем успешного запуска или окончания
      тайм-аута for(StartUpCounter=0; ; StartUpCounter++) { //Если
      успешно запустилось, то //выходим из цикла if(RCC-&gt;CR &amp;
      (1&lt;&lt;RCC_CR_HSERDY_Pos)) break; //Если не запустилось, то
      //отключаем все, что включили //и возвращаем ошибку
      if(StartUpCounter &gt; 0x1000) { RCC-&gt;CR &amp;=
      ~(1&lt;&lt;RCC_CR_HSEON_Pos); //Останавливаем HSE return 1; } }
    </div>
  </div>
  <pre>
__IO int StartUpCounter;

//Ждем успешного запуска или окончания тайм-аута
for(StartUpCounter=0; ; StartUpCounter++)
{
//Если успешно запустилось, то 
//выходим из цикла
if(RCC-&gt;CR &amp; (1&lt;&lt;RCC_CR_HSERDY_Pos))
break;

//Если не запустилось, то
//отключаем все, что включили
//и возвращаем ошибку
if(StartUpCounter &gt; 0x1000)
{
RCC-&gt;CR &amp;= ~(1&lt;&lt;RCC_CR_HSEON_Pos); //Останавливаем HSE
return 1;
}
}</pre
  >
  <br />
  Тут реализован тайм-аут на запуск <em>HSE</em>. Если генератор успел
  запуститься до возникновения условия&nbsp;<em
    >if(StartUpCounter &gt; 0x1000)</em
  >, то мы выходим из цикла <em>for()</em> с помощью
  инструкции&nbsp;<em>break</em>.

  <p>
    Так, <em>HSE</em> запустили. Переходим к настройке
    <em>PLL</em>:<br />
  </p>
  <div>
    <div></div>
    <div>
      <div>
        <div><span>//Настраиваем PLL</span></div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CFGR |= </span
          ><span>(</span><span>0x07</span><span>&lt;&lt;</span
          ><span>RCC_CFGR_PLLMULL_Pos</span><span>)</span>
          <span>//PLL множитель равен 9</span>
        </div>
      </div>
      <div>
        <div>
          <span> | </span><span>(</span><span>0x01</span
          ><span>&lt;&lt;</span><span>RCC_CFGR_PLLSRC_Pos</span
          ><span>)</span><span>; </span
          ><span>//Тактирование PLL от HSE</span>
        </div>
      </div>
    </div>
    <div>
      //Настраиваем PLL RCC-&gt;CFGR |=
      (0x07&lt;&lt;RCC_CFGR_PLLMULL_Pos) //PLL множитель равен 9 |
      (0x01&lt;&lt;RCC_CFGR_PLLSRC_Pos); //Тактирование PLL от HSE
    </div>
  </div>
  <pre>
//Настраиваем PLL
RCC-&gt;CFGR |= (0x07&lt;&lt;RCC_CFGR_PLLMULL_Pos) //PLL множитель равен 9
    | (0x01&lt;&lt;RCC_CFGR_PLLSRC_Pos); //Тактирование PLL от HSE</pre
  >
  <br />
  Тут просто настраиваем коэффициент умножения и выбираем источник
  тактирования <em>PLL</em>. Далее, запускаем <em>PLL</em>:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>RCC-</span><span>&gt;</span><span>CR |= </span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_PLLON_Pos</span><span>)</span><span>; </span
          ><span>//Запускаем PLL</span>
        </div>
      </div>
    </div>
    <div>
      RCC-&gt;CR |= (1&lt;&lt;RCC_CR_PLLON_Pos); //Запускаем PLL
    </div>
  </div>
  <pre>
RCC-&gt;CR |= (1&lt;&lt;RCC_CR_PLLON_Pos); //Запускаем PLL</pre
  >
  <br />
  После этого ждем успешного запуска. Тут ожидание реализовано точно
  так же, как и для <em>HSE</em>:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span> </span
          ><span
            >//Ждем успешного запуска или окончания тайм-аута</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>for</span><span>(</span
          ><span>StartUpCounter=0; ; StartUpCounter++</span
          ><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div>
          <span>//Если успешно запустилось, то </span>
        </div>
      </div>
      <div>
        <div><span>//выходим из цикла</span></div>
      </div>
      <div>
        <div>
          <span>if</span><span>(</span><span>RCC-</span
          ><span>&gt;</span><span>CR &amp; </span><span>(</span
          ><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_PLLRDY_Pos</span><span>))</span>
        </div>
      </div>
      <div>
        <div><span>break</span><span>;</span></div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span
            >//Если по каким-то причинам не запустился PLL, то</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>//отключаем все, что включили</span>
        </div>
      </div>
      <div>
        <div><span>//и возвращаем ошибку</span></div>
      </div>
      <div>
        <div>
          <span>if</span><span>(</span><span>StartUpCounter </span
          ><span>&gt;</span><span> </span><span>0x1000</span
          ><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CR &amp;= ~</span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_HSEON_Pos</span><span>)</span><span>; </span
          ><span>//Останавливаем HSE</span>
        </div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CR &amp;= ~</span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_PLLON_Pos</span><span>)</span><span>; </span
          ><span>//Останавливаем PLL</span>
        </div>
      </div>
      <div>
        <div><span>return</span><span> 2;</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
    </div>
    <div>
      //Ждем успешного запуска или окончания тайм-аута
      for(StartUpCounter=0; ; StartUpCounter++) { //Если успешно
      запустилось, то //выходим из цикла if(RCC-&gt;CR &amp;
      (1&lt;&lt;RCC_CR_PLLRDY_Pos)) break; //Если по каким-то причинам
      не запустился PLL, то //отключаем все, что включили //и
      возвращаем ошибку if(StartUpCounter &gt; 0x1000) { RCC-&gt;CR
      &amp;= ~(1&lt;&lt;RCC_CR_HSEON_Pos); //Останавливаем HSE
      RCC-&gt;CR &amp;= ~(1&lt;&lt;RCC_CR_PLLON_Pos); //Останавливаем
      PLL return 2; } }
    </div>
  </div>
  <pre>
//Ждем успешного запуска или окончания тайм-аута
for(StartUpCounter=0; ; StartUpCounter++)
{
//Если успешно запустилось, то 
//выходим из цикла
if(RCC-&gt;CR &amp; (1&lt;&lt;RCC_CR_PLLRDY_Pos))
break;

//Если по каким-то причинам не запустился PLL, то
//отключаем все, что включили
//и возвращаем ошибку
if(StartUpCounter &gt; 0x1000)
{
RCC-&gt;CR &amp;= ~(1&lt;&lt;RCC_CR_HSEON_Pos); //Останавливаем HSE
RCC-&gt;CR &amp;= ~(1&lt;&lt;RCC_CR_PLLON_Pos); //Останавливаем PLL
return 2;
}
}</pre
  >
  <br />
  После этого настраиваем <em>FLASH</em> и делители:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span> </span
          ><span>//Устанавливаем 2 цикла ожидания для Flash</span>
        </div>
      </div>
      <div>
        <div>
          <span> </span
          ><span
            >//так как частота ядра у нас будет 48 MHz &lt; SYSCLK
            &lt;= 72 MHz</span
          >
        </div>
      </div>
      <div>
        <div>
          <span> FLASH-</span><span>&gt;</span><span>ACR |= </span
          ><span>(</span><span>0x02</span><span>&lt;&lt;</span
          ><span>FLASH_ACR_LATENCY_Pos</span><span>)</span
          ><span>; </span>
        </div>
      </div>
      <div></div>
      <div>
        <div><span>//Делители</span></div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CFGR |= </span
          ><span>(</span><span>0x00</span><span>&lt;&lt;</span
          ><span>RCC_CFGR_PPRE2_Pos</span><span>)</span><span> </span
          ><span
            >//Делитель шины APB2 отключен (оставляем 0 по
            умолчанию)</span
          >
        </div>
      </div>
      <div>
        <div>
          <span> | </span><span>(</span><span>0x04</span
          ><span>&lt;&lt;</span><span>RCC_CFGR_PPRE1_Pos</span
          ><span>)</span><span> </span
          ><span>//Делитель нишы APB1 равен 2</span>
        </div>
      </div>
      <div>
        <div>
          <span> | </span><span>(</span><span>0x00</span
          ><span>&lt;&lt;</span><span>RCC_CFGR_HPRE_Pos</span
          ><span>)</span><span>; </span
          ><span
            >//Делитель AHB отключен (оставляем 0 по умолчанию)</span
          >
        </div>
      </div>
    </div>
    <div>
      //Устанавливаем 2 цикла ожидания для Flash //так как частота
      ядра у нас будет 48 MHz &lt; SYSCLK &lt;= 72 MHz FLASH-&gt;ACR
      |= (0x02&lt;&lt;FLASH_ACR_LATENCY_Pos); //Делители RCC-&gt;CFGR
      |= (0x00&lt;&lt;RCC_CFGR_PPRE2_Pos) //Делитель шины APB2
      отключен (оставляем 0 по умолчанию) |
      (0x04&lt;&lt;RCC_CFGR_PPRE1_Pos) //Делитель нишы APB1 равен 2 |
      (0x00&lt;&lt;RCC_CFGR_HPRE_Pos); //Делитель AHB отключен
      (оставляем 0 по умолчанию)
    </div>
  </div>
  <pre>
//Устанавливаем 2 цикла ожидания для Flash
//так как частота ядра у нас будет 48 MHz &lt; SYSCLK &lt;= 72 MHz
FLASH-&gt;ACR |= (0x02&lt;&lt;FLASH_ACR_LATENCY_Pos); 

//Делители
RCC-&gt;CFGR |= (0x00&lt;&lt;RCC_CFGR_PPRE2_Pos) //Делитель шины APB2 отключен (оставляем 0 по умолчанию)
    | (0x04&lt;&lt;RCC_CFGR_PPRE1_Pos) //Делитель нишы APB1 равен 2
    | (0x00&lt;&lt;RCC_CFGR_HPRE_Pos); //Делитель AHB отключен (оставляем 0 по умолчанию)</pre
  >
  <br />
  Ну и торжественный момент переключение на работу от
  <em>PLL</em>:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>RCC-</span><span>&gt;</span><span>CFGR |= </span
          ><span>(</span><span>0x02</span><span>&lt;&lt;</span
          ><span>RCC_CFGR_SW_Pos</span><span>)</span><span>; </span
          ><span>//Переключаемся на работу от PLL</span>
        </div>
      </div>
    </div>
    <div>
      RCC-&gt;CFGR |= (0x02&lt;&lt;RCC_CFGR_SW_Pos); //Переключаемся
      на работу от PLL
    </div>
  </div>
  <pre>
RCC-&gt;CFGR |= (0x02&lt;&lt;RCC_CFGR_SW_Pos); //Переключаемся на работу от PLL</pre
  >
  <br />
  Ждем завершения переключения:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div><span>//Ждем, пока переключимся</span></div>
      </div>
      <div>
        <div>
          <span>while</span><span>((</span><span>RCC-</span
          ><span>&gt;</span><span>CFGR &amp; RCC_CFGR_SWS_Msk</span
          ><span>)</span><span> != </span><span>(</span
          ><span>0x02</span><span>&lt;&lt;</span
          ><span>RCC_CFGR_SWS_Pos</span><span>))</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
    </div>
    <div>
      //Ждем, пока переключимся while((RCC-&gt;CFGR &amp;
      RCC_CFGR_SWS_Msk) != (0x02&lt;&lt;RCC_CFGR_SWS_Pos)) { }
    </div>
  </div>
  <pre>
//Ждем, пока переключимся
while((RCC-&gt;CFGR &amp; RCC_CFGR_SWS_Msk) != (0x02&lt;&lt;RCC_CFGR_SWS_Pos))
{
}</pre
  >
  <br />
  Поздравляю! Мы запустились от <em>PLL</em>! После этого можно
  отключить RC-генератор <em>HSI</em>, так как он нам больше не
  нужен:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span>//После того, как переключились на</span>
        </div>
      </div>
      <div>
        <div>
          <span>//внешний источник такирования</span>
        </div>
      </div>
      <div>
        <div>
          <span> </span
          ><span>//отключаем внутренний RC-генератор</span>
        </div>
      </div>
      <div>
        <div><span>//для экономии энергии</span></div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CR &amp;= ~</span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_HSION_Pos</span><span>)</span><span>;</span>
        </div>
      </div>
    </div>
    <div>
      //После того, как переключились на //внешний источник
      такирования //отключаем внутренний RC-генератор //для экономии
      энергии RCC-&gt;CR &amp;= ~(1&lt;&lt;RCC_CR_HSION_Pos);
    </div>
  </div>
  <pre>
//После того, как переключились на
//внешний источник такирования
//отключаем внутренний RC-генератор
//для экономии энергии
RCC-&gt;CR &amp;= ~(1&lt;&lt;RCC_CR_HSION_Pos);</pre
  >
  <br />
  Приведу весь код функции переключения на работу от
  <em>PLL</em>:<br />
  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span
            >//Настраиваем тактирование системы от внешнего
            кварца</span
          >
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>//через PLL на саксимально возможных частотах.</span>
        </div>
      </div>
      <div>
        <div>
          <span>//Внешний кварц должен быть на 8МГц</span>
        </div>
      </div>
      <div>
        <div>
          <span>//Возвращает:</span>
        </div>
      </div>
      <div>
        <div>
          <span>// 0 - завершено успешно</span>
        </div>
      </div>
      <div>
        <div>
          <span></span
          ><span>// 1 - не запустился кварцевый генератор</span>
        </div>
      </div>
      <div>
        <div>
          <span>// 2 - не запустился PLL</span>
        </div>
      </div>
      <div>
        <div>
          <span>int</span><span> </span><span>ClockInit</span
          ><span>(</span><span>void</span><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div>
          <span> __IO </span><span>int</span
          ><span> StartUpCounter;</span>
        </div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span
            >////////////////////////////////////////////////////////////</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>//Запускаем кварцевый генератор</span>
        </div>
      </div>
      <div>
        <div>
          <span> </span
          ><span
            >////////////////////////////////////////////////////////////</span
          >
        </div>
      </div>
      <div></div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CR |= </span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_HSEON_Pos</span><span>)</span><span>; </span
          ><span>//Запускаем генератор HSE</span>
        </div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span
            >//Ждем успешного запуска или окончания тайм-аута</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>for</span><span>(</span
          ><span>StartUpCounter=0; ; StartUpCounter++</span
          ><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div>
          <span>//Если успешно запустилось, то </span>
        </div>
      </div>
      <div>
        <div><span>//выходим из цикла</span></div>
      </div>
      <div>
        <div>
          <span>if</span><span>(</span><span>RCC-</span
          ><span>&gt;</span><span>CR &amp; </span><span>(</span
          ><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_HSERDY_Pos</span><span>))</span>
        </div>
      </div>
      <div>
        <div><span>break</span><span>;</span></div>
      </div>
      <div></div>
      <div>
        <div><span>//Если не запустилось, то</span></div>
      </div>
      <div>
        <div>
          <span>//отключаем все, что включили</span>
        </div>
      </div>
      <div>
        <div><span>//и возвращаем ошибку</span></div>
      </div>
      <div>
        <div>
          <span>if</span><span>(</span><span>StartUpCounter </span
          ><span>&gt;</span><span> </span><span>0x1000</span
          ><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CR &amp;= ~</span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_HSEON_Pos</span><span>)</span><span>; </span
          ><span>//Останавливаем HSE</span>
        </div>
      </div>
      <div>
        <div><span>return</span><span> 1;</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span
            >////////////////////////////////////////////////////////////</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>//Настраиваем и запускаем PLL</span>
        </div>
      </div>
      <div>
        <div>
          <span> </span
          ><span
            >////////////////////////////////////////////////////////////</span
          >
        </div>
      </div>
      <div></div>
      <div>
        <div><span>//Настраиваем PLL</span></div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CFGR |= </span
          ><span>(</span><span>0x07</span><span>&lt;&lt;</span
          ><span>RCC_CFGR_PLLMULL_Pos</span><span>)</span>
          <span>//PLL множитель равен 9</span>
        </div>
      </div>
      <div>
        <div>
          <span> | </span><span>(</span><span>0x01</span
          ><span>&lt;&lt;</span><span>RCC_CFGR_PLLSRC_Pos</span
          ><span>)</span><span>; </span
          ><span>//Тактирование PLL от HSE</span>
        </div>
      </div>
      <div></div>
      <div></div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CR |= </span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_PLLON_Pos</span><span>)</span><span>; </span
          ><span>//Запускаем PLL</span>
        </div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span
            >//Ждем успешного запуска или окончания тайм-аута</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>for</span><span>(</span
          ><span>StartUpCounter=0; ; StartUpCounter++</span
          ><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div>
          <span>//Если успешно запустилось, то </span>
        </div>
      </div>
      <div>
        <div><span>//выходим из цикла</span></div>
      </div>
      <div>
        <div>
          <span>if</span><span>(</span><span>RCC-</span
          ><span>&gt;</span><span>CR &amp; </span><span>(</span
          ><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_PLLRDY_Pos</span><span>))</span>
        </div>
      </div>
      <div>
        <div><span>break</span><span>;</span></div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span
            >//Если по каким-то причинам не запустился PLL, то</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>//отключаем все, что включили</span>
        </div>
      </div>
      <div>
        <div><span>//и возвращаем ошибку</span></div>
      </div>
      <div>
        <div>
          <span>if</span><span>(</span><span>StartUpCounter </span
          ><span>&gt;</span><span> </span><span>0x1000</span
          ><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CR &amp;= ~</span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_HSEON_Pos</span><span>)</span><span>; </span
          ><span>//Останавливаем HSE</span>
        </div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CR &amp;= ~</span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_PLLON_Pos</span><span>)</span><span>; </span
          ><span>//Останавливаем PLL</span>
        </div>
      </div>
      <div>
        <div><span>return</span><span> 2;</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span
            >////////////////////////////////////////////////////////////</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>//Настраиваем FLASH и делители</span>
        </div>
      </div>
      <div>
        <div>
          <span> </span
          ><span
            >////////////////////////////////////////////////////////////</span
          >
        </div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span>//Устанавливаем 2 цикла ожидания для Flash</span>
        </div>
      </div>
      <div>
        <div>
          <span> </span
          ><span
            >//так как частота ядра у нас будет 48 MHz &lt; SYSCLK
            &lt;= 72 MHz</span
          >
        </div>
      </div>
      <div>
        <div>
          <span> FLASH-</span><span>&gt;</span><span>ACR |= </span
          ><span>(</span><span>0x02</span><span>&lt;&lt;</span
          ><span>FLASH_ACR_LATENCY_Pos</span><span>)</span
          ><span>; </span>
        </div>
      </div>
      <div></div>
      <div>
        <div><span>//Делители</span></div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CFGR |= </span
          ><span>(</span><span>0x00</span><span>&lt;&lt;</span
          ><span>RCC_CFGR_PPRE2_Pos</span><span>)</span><span> </span
          ><span>//Делитель шины APB2 отключен</span>
        </div>
      </div>
      <div>
        <div>
          <span> | </span><span>(</span><span>0x04</span
          ><span>&lt;&lt;</span><span>RCC_CFGR_PPRE1_Pos</span
          ><span>)</span><span> </span
          ><span>//Делитель нишы APB1 равен 2</span>
        </div>
      </div>
      <div>
        <div>
          <span> | </span><span>(</span><span>0x00</span
          ><span>&lt;&lt;</span><span>RCC_CFGR_HPRE_Pos</span
          ><span>)</span><span>; </span
          ><span>//Делитель AHB отключен</span>
        </div>
      </div>
      <div></div>
      <div></div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CFGR |= </span
          ><span>(</span><span>0x02</span><span>&lt;&lt;</span
          ><span>RCC_CFGR_SW_Pos</span><span>)</span><span>; </span
          ><span>//Переключаемся на работу от PLL</span>
        </div>
      </div>
      <div></div>
      <div>
        <div><span>//Ждем, пока переключимся</span></div>
      </div>
      <div>
        <div>
          <span>while</span><span>((</span><span>RCC-</span
          ><span>&gt;</span><span>CFGR &amp; RCC_CFGR_SWS_Msk</span
          ><span>)</span><span> != </span><span>(</span
          ><span>0x02</span><span>&lt;&lt;</span
          ><span>RCC_CFGR_SWS_Pos</span><span>))</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
      <div></div>
      <div>
        <div>
          <span>//После того, как переключились на</span>
        </div>
      </div>
      <div>
        <div>
          <span>//внешний источник такирования</span>
        </div>
      </div>
      <div>
        <div>
          <span> </span
          ><span>//отключаем внутренний RC-генератор</span>
        </div>
      </div>
      <div>
        <div><span>//для экономии энергии</span></div>
      </div>
      <div>
        <div>
          <span> RCC-</span><span>&gt;</span><span>CR &amp;= ~</span
          ><span>(</span><span>1</span><span>&lt;&lt;</span
          ><span>RCC_CR_HSION_Pos</span><span>)</span><span>;</span>
        </div>
      </div>
      <div></div>
      <div>
        <div>
          <span>//Настройка и переклбючение сисемы</span>
        </div>
      </div>
      <div>
        <div>
          <span>//на внешний кварцевый генератор</span>
        </div>
      </div>
      <div>
        <div>
          <span>//и PLL запершилось успехом.</span>
        </div>
      </div>
      <div>
        <div><span>//Выходим</span></div>
      </div>
      <div>
        <div><span>return</span><span> 0;</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
    </div>
    <div>
      //Настраиваем тактирование системы от внешнего кварца //через
      PLL на саксимально возможных частотах. //Внешний кварц должен
      быть на 8МГц //Возвращает: // 0 - завершено успешно // 1 - не
      запустился кварцевый генератор // 2 - не запустился PLL int
      ClockInit(void) { __IO int StartUpCounter;
      ////////////////////////////////////////////////////////////
      //Запускаем кварцевый генератор
      ////////////////////////////////////////////////////////////
      RCC-&gt;CR |= (1&lt;&lt;RCC_CR_HSEON_Pos); //Запускаем генератор
      HSE //Ждем успешного запуска или окончания тайм-аута
      for(StartUpCounter=0; ; StartUpCounter++) { //Если успешно
      запустилось, то //выходим из цикла if(RCC-&gt;CR &amp;
      (1&lt;&lt;RCC_CR_HSERDY_Pos)) break; //Если не запустилось, то
      //отключаем все, что включили //и возвращаем ошибку
      if(StartUpCounter &gt; 0x1000) { RCC-&gt;CR &amp;=
      ~(1&lt;&lt;RCC_CR_HSEON_Pos); //Останавливаем HSE return 1; } }
      ////////////////////////////////////////////////////////////
      //Настраиваем и запускаем PLL
      ////////////////////////////////////////////////////////////
      //Настраиваем PLL RCC-&gt;CFGR |=
      (0x07&lt;&lt;RCC_CFGR_PLLMULL_Pos) //PLL множитель равен 9 |
      (0x01&lt;&lt;RCC_CFGR_PLLSRC_Pos); //Тактирование PLL от HSE
      RCC-&gt;CR |= (1&lt;&lt;RCC_CR_PLLON_Pos); //Запускаем PLL
      //Ждем успешного запуска или окончания тайм-аута
      for(StartUpCounter=0; ; StartUpCounter++) { //Если успешно
      запустилось, то //выходим из цикла if(RCC-&gt;CR &amp;
      (1&lt;&lt;RCC_CR_PLLRDY_Pos)) break; //Если по каким-то причинам
      не запустился PLL, то //отключаем все, что включили //и
      возвращаем ошибку if(StartUpCounter &gt; 0x1000) { RCC-&gt;CR
      &amp;= ~(1&lt;&lt;RCC_CR_HSEON_Pos); //Останавливаем HSE
      RCC-&gt;CR &amp;= ~(1&lt;&lt;RCC_CR_PLLON_Pos); //Останавливаем
      PLL return 2; } }
      ////////////////////////////////////////////////////////////
      //Настраиваем FLASH и делители
      ////////////////////////////////////////////////////////////
      //Устанавливаем 2 цикла ожидания для Flash //так как частота
      ядра у нас будет 48 MHz &lt; SYSCLK &lt;= 72 MHz FLASH-&gt;ACR
      |= (0x02&lt;&lt;FLASH_ACR_LATENCY_Pos); //Делители RCC-&gt;CFGR
      |= (0x00&lt;&lt;RCC_CFGR_PPRE2_Pos) //Делитель шины APB2
      отключен | (0x04&lt;&lt;RCC_CFGR_PPRE1_Pos) //Делитель нишы APB1
      равен 2 | (0x00&lt;&lt;RCC_CFGR_HPRE_Pos); //Делитель AHB
      отключен RCC-&gt;CFGR |= (0x02&lt;&lt;RCC_CFGR_SW_Pos);
      //Переключаемся на работу от PLL //Ждем, пока переключимся
      while((RCC-&gt;CFGR &amp; RCC_CFGR_SWS_Msk) !=
      (0x02&lt;&lt;RCC_CFGR_SWS_Pos)) { } //После того, как
      переключились на //внешний источник такирования //отключаем
      внутренний RC-генератор //для экономии энергии RCC-&gt;CR &amp;=
      ~(1&lt;&lt;RCC_CR_HSION_Pos); //Настройка и переклбючение сисемы
      //на внешний кварцевый генератор //и PLL запершилось успехом.
      //Выходим return 0; }
    </div>
  </div>
  <pre>
//Настраиваем тактирование системы от внешнего кварца
//через PLL на саксимально возможных частотах.
//Внешний кварц должен быть на 8МГц
//Возвращает:
//  0 - завершено успешно
//  1 - не запустился кварцевый генератор
//  2 - не запустился PLL
int ClockInit(void)
{
__IO int StartUpCounter;

////////////////////////////////////////////////////////////
//Запускаем кварцевый генератор
////////////////////////////////////////////////////////////

RCC-&gt;CR |= (1&lt;&lt;RCC_CR_HSEON_Pos); //Запускаем генератор HSE

//Ждем успешного запуска или окончания тайм-аута
for(StartUpCounter=0; ; StartUpCounter++)
{
//Если успешно запустилось, то 
//выходим из цикла
if(RCC-&gt;CR &amp; (1&lt;&lt;RCC_CR_HSERDY_Pos))
break;

//Если не запустилось, то
//отключаем все, что включили
//и возвращаем ошибку
if(StartUpCounter &gt; 0x1000)
{
RCC-&gt;CR &amp;= ~(1&lt;&lt;RCC_CR_HSEON_Pos); //Останавливаем HSE
return 1;
}
}

////////////////////////////////////////////////////////////
//Настраиваем и запускаем PLL
////////////////////////////////////////////////////////////

//Настраиваем PLL
RCC-&gt;CFGR |= (0x07&lt;&lt;RCC_CFGR_PLLMULL_Pos) //PLL множитель равен 9
    | (0x01&lt;&lt;RCC_CFGR_PLLSRC_Pos); //Тактирование PLL от HSE


RCC-&gt;CR |= (1&lt;&lt;RCC_CR_PLLON_Pos); //Запускаем PLL

//Ждем успешного запуска или окончания тайм-аута
for(StartUpCounter=0; ; StartUpCounter++)
{
//Если успешно запустилось, то 
//выходим из цикла
if(RCC-&gt;CR &amp; (1&lt;&lt;RCC_CR_PLLRDY_Pos))
break;

//Если по каким-то причинам не запустился PLL, то
//отключаем все, что включили
//и возвращаем ошибку
if(StartUpCounter &gt; 0x1000)
{
RCC-&gt;CR &amp;= ~(1&lt;&lt;RCC_CR_HSEON_Pos); //Останавливаем HSE
RCC-&gt;CR &amp;= ~(1&lt;&lt;RCC_CR_PLLON_Pos); //Останавливаем PLL
return 2;
}
}

////////////////////////////////////////////////////////////
//Настраиваем FLASH и делители
////////////////////////////////////////////////////////////

//Устанавливаем 2 цикла ожидания для Flash
//так как частота ядра у нас будет 48 MHz &lt; SYSCLK &lt;= 72 MHz
FLASH-&gt;ACR |= (0x02&lt;&lt;FLASH_ACR_LATENCY_Pos); 

//Делители
RCC-&gt;CFGR |= (0x00&lt;&lt;RCC_CFGR_PPRE2_Pos) //Делитель шины APB2 отключен
    | (0x04&lt;&lt;RCC_CFGR_PPRE1_Pos) //Делитель нишы APB1 равен 2
    | (0x00&lt;&lt;RCC_CFGR_HPRE_Pos); //Делитель AHB отключен


RCC-&gt;CFGR |= (0x02&lt;&lt;RCC_CFGR_SW_Pos); //Переключаемся на работу от PLL

//Ждем, пока переключимся
while((RCC-&gt;CFGR &amp; RCC_CFGR_SWS_Msk) != (0x02&lt;&lt;RCC_CFGR_SWS_Pos))
{
}

//После того, как переключились на
//внешний источник такирования
//отключаем внутренний RC-генератор
//для экономии энергии
RCC-&gt;CR &amp;= ~(1&lt;&lt;RCC_CR_HSION_Pos);

//Настройка и переклбючение сисемы
//на внешний кварцевый генератор
//и PLL запершилось успехом.
//Выходим
return 0;
}</pre
  >
  <br />`
},
  {
    title: 'Быстрый старт с STM32CubeMx',
  content: `
  <p>
    Всем нам известная фирма ST Microelectronics активно развивает
    свой продукт под названием <strong>STM32CubeMx</strong>, и я не
    мог обойти это вниманием, поэтому и решил сделать новую
    одноименную рубрику. И для начала разберемся, что это вообще
    такое, и для чего нужно. Итак...
  </p>

  <p>
    STM32CubeMx - программный продукт, позволяющий легко и
    непринужденно при помощи достаточно понятного графического
    интерфейса произвести настройку любой имеющейся на борту
    микроконтроллера периферии. Предыстория создания CubeMx такова -
    ST имеют очень разнообразную линейку микроконтроллеров, тут и
    Cortex-M0, и Cortex-M0+, и Cortex-M3, и Cortex-M4. Соответственно,
    встает вопрос о каком-то едином наборе библиотек и едином
    инструменте для инициализации и конфигурирования всего этого
    многообразия. Вот для решения этих целей и был выпущен
    STM32CubeMx.
  </p>

  <p>
    Суть концепции такова - создаем проект, выбираем микроконтроллер,
    и нам сразу же предлагается схема со всеми выводами выбранного
    контроллера. Нажимая на выводы и заходя в разнообразные меню, мы
    легко настраиваем как периферию, так и режимы работы каждого
    конкретного вывода. Сразу же очевидные плюсы - можно наглядно
    увидеть, какие выводы уже заняты, а какие еще свободны (в крупных
    проектах - более чем полезная функция). Давайте рассмотрим все
    вышеперечисленное на практическом примере.
  </p>

  <p>
    Собственно, устанавливаем STM32CubeMx, запускаем и создаем новый
    проект:
  </p>

  <p>
    Сразу же открывается окно с огромным количеством фильтров, в
    котором необходимо выбрать микроконтроллер, который мы собираемся
    использовать в проекте. Я выбрал
    <strong>STM32F407VG</strong>:
  </p>

  <p>
    В результате будет открыто окно для работы с созданным проектом:
  </p>

  <p>
    И тут мы уже видим в правой части изображение нашего контроллера
    со всеми выводами, а слева список всей доступной периферии.
    Соответственно, можно, кликая на выводы, задавать их режимы
    работы, либо в списке периферии активировать те или иные модули.
  </p>

  <p>
    На вкладке Clock Configuration задаются все необходимые параметры
    тактирования, об этом пойдет речь в одной из следующих статей
    <a>курса</a>.
  </p>

  <p>
    Если мы зайдем во вкладку Project Manager, то сможем
    последовательно настроить (перечисляю основное):
  </p>

  <ul>
    <li>имя проекта</li>

    <li>путь для сохранения проекта</li>

    <li>
      среду разработки, для которой будут сгенерированы файлы проекта
    </li>

    <li>
      версию библиотек, которые будут использованы для генерации
      исходного кода
    </li>
  </ul>

  <p>
    Давайте для примера выберем что-нибудь. Пусть будет задействован
    первый канал АЦП (PA0) и три вывода, работающих в режиме выхода
    (PE4, PD13, PC0):
  </p>

  <ul>
    <li>
      <em
        >кроме того, если планируется использовать отладчик,
        необходимо в пункте SYS выбрать отладочный интерфейс.
        Например, для отладчика ST-Link настройки будут выглядеть
        так:</em
      >
    </li>
  </ul>

  <p>
    Готово, теперь нажимаем на кнопку "Generate Code" в правом верхнем
    углу, и CubeMx предложит нам скачать необходимые библиотеки (в
    случае их отсутствия). Не препятствуем данному процессу, ждем.
  </p>

  <p>
    После окончания генерации открываем папку с нашим проектом и
    видим, что там появились новые файлы. В папке
    <em>Drivers </em>содержатся все необходимые библиотеки, а в папках
    <em>src </em>и <em>inc</em>, соответственно, сами файлы со
    сгенерированным кодом. Откроем, например, <em>main.c</em>:
  </p>

  <div>
    <div></div>
    <div>
      <div>
        <div>
          <span
            >/***************************************************************************************/</span
          >
        </div>
      </div>
      <div>
        <div>
          <span>int</span> <span>main</span><span>(</span
          ><span>void</span><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div></div>
      <div>
        <div><span>/* USER CODE BEGIN 1 */</span></div>
      </div>
      <div></div>
      <div>
        <div><span>/* USER CODE END 1 */</span></div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span
            >/* MCU
            Configuration----------------------------------------------------------*/</span
          >
        </div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span
            >/* Reset of all peripherals, Initializes the Flash
            interface and the Systick. */</span
          >
        </div>
      </div>
      <div>
        <div><span>HAL_Init</span><span>()</span><span>;</span></div>
      </div>
      <div></div>
      <div>
        <div>
          <span>/* Configure the system clock */</span>
        </div>
      </div>
      <div>
        <div>
          <span>SystemClock_Config</span><span>()</span><span>;</span>
        </div>
      </div>
      <div></div>
      <div>
        <div>
          <span>/* System interrupt init*/</span>
        </div>
      </div>
      <div>
        <div>
          <span> </span
          ><span>/* Sets the priority grouping field */</span>
        </div>
      </div>
      <div>
        <div>
          <span>HAL_NVIC_SetPriorityGrouping</span><span>(</span
          ><span>NVIC_PRIORITYGROUP_0</span><span>)</span
          ><span>;</span>
        </div>
      </div>
      <div>
        <div>
          <span>HAL_NVIC_SetPriority</span><span>(</span
          ><span>SysTick_IRQn, 0, 0</span><span>)</span><span>;</span>
        </div>
      </div>
      <div></div>
      <div>
        <div>
          <span> </span
          ><span>/* Initialize all configured peripherals */</span>
        </div>
      </div>
      <div>
        <div>
          <span>MX_GPIO_Init</span><span>()</span><span>;</span>
        </div>
      </div>
      <div>
        <div>
          <span>MX_ADC1_Init</span><span>()</span><span>;</span>
        </div>
      </div>
      <div></div>
      <div>
        <div><span>/* USER CODE BEGIN 2 */</span></div>
      </div>
      <div></div>
      <div>
        <div><span>/* USER CODE END 2 */</span></div>
      </div>
      <div></div>
      <div>
        <div><span>/* Infinite loop */</span></div>
      </div>
      <div>
        <div>
          <span>/* USER CODE BEGIN WHILE */</span>
        </div>
      </div>
      <div>
        <div>
          <span>while</span> <span>(</span><span>1</span
          ><span>)</span>
        </div>
      </div>
      <div>
        <div><span>{</span></div>
      </div>
      <div>
        <div><span>/* USER CODE END WHILE */</span></div>
      </div>
      <div></div>
      <div>
        <div><span>/* USER CODE BEGIN 3 */</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
      <div>
        <div><span>/* USER CODE END 3 */</span></div>
      </div>
      <div>
        <div><span>}</span></div>
      </div>
      <div></div>
      <div></div>
      <div>
        <div>
          <span></span
          ><span
            >/***************************************************************************************/</span
          >
        </div>
      </div>
    </div>
    <div>
      /***************************************************************************************/
      int main(void) { /* USER CODE BEGIN 1 */ /* USER CODE END 1 */
      /* MCU
      Configuration----------------------------------------------------------*/
      /* Reset of all peripherals, Initializes the Flash interface and
      the Systick. */ HAL_Init(); /* Configure the system clock */
      SystemClock_Config(); /* System interrupt init*/ /* Sets the
      priority grouping field */
      HAL_NVIC_SetPriorityGrouping(NVIC_PRIORITYGROUP_0);
      HAL_NVIC_SetPriority(SysTick_IRQn, 0, 0); /* Initialize all
      configured peripherals */ MX_GPIO_Init(); MX_ADC1_Init(); /*
      USER CODE BEGIN 2 */ /* USER CODE END 2 */ /* Infinite loop */
      /* USER CODE BEGIN WHILE */ while (1) { /* USER CODE END WHILE
      */ /* USER CODE BEGIN 3 */ } /* USER CODE END 3 */ }
      /***************************************************************************************/
    </div>
  </div>
  <pre>
/***************************************************************************************/
    int main(void)
    {
    
      /* USER CODE BEGIN 1 */
    
      /* USER CODE END 1 */
    
      /* MCU Configuration----------------------------------------------------------*/
    
      /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
      HAL_Init();
    
      /* Configure the system clock */
      SystemClock_Config();
    
      /* System interrupt init*/
      /* Sets the priority grouping field */
      HAL_NVIC_SetPriorityGrouping(NVIC_PRIORITYGROUP_0);
      HAL_NVIC_SetPriority(SysTick_IRQn, 0, 0);
    
      /* Initialize all configured peripherals */
      MX_GPIO_Init();
      MX_ADC1_Init();
    
      /* USER CODE BEGIN 2 */
    
      /* USER CODE END 2 */
    
      /* Infinite loop */
      /* USER CODE BEGIN WHILE */
      while (1)
      {
        /* USER CODE END WHILE */
    
        /* USER CODE BEGIN 3 */
      }
      /* USER CODE END 3 */
    }
    
    
    /***************************************************************************************/</pre
  >

  <p>В функции</p>
  <div>
    <span><span>main</span><span>()</span></span>
  </div>
  <code>main()</code>
  вызываются
  <div>
    <span><span>MX_GPIO_Init</span><span>()</span></span>
  </div>
  <code>MX_GPIO_Init()</code>
  и
  <div>
    <span><span>MX_ADC1_Init</span><span>()</span></span>
  </div>
  <code>MX_ADC1_Init()</code>, которые определены в этом же файле.
  Собственно, в этих функциях и содержится инициализация и настройка
  всей периферии, которую мы выбрали при создании проекта в
  STM32CubeMx. Таким образом, отпадает необходимость вручную
  производить конфигурацию использующихся модулей контроллера, все это
  уже содержится в сгенерированном коде.
  <p>Свой собственный код нужно добавлять внутри секций вида:</p>
  <div>
    <div></div>
    <div>
      <div>
        <div><span>/* USER CODE BEGIN 2 */</span></div>
      </div>
      <div>
        <div>
          <span>// Здесь пользовательская программа</span>
        </div>
      </div>
      <div>
        <div><span>/* USER CODE END 2 */</span></div>
      </div>
    </div>
    <div>
      /* USER CODE BEGIN 2 */ // Здесь пользовательская программа /*
      USER CODE END 2 */
    </div>
  </div>
  <pre>
/* USER CODE BEGIN 2 */
    // Здесь пользовательская программа
    /* USER CODE END 2 */</pre
  >
  <p>
    Тогда при изменении проекта в CubeMx пользовательская часть
    программы будет автоматически перенесена и в заново
    сгенерированные файлы 👍
  </p>

  <p>
    Резюмируем - таким вот образом мы получаем инструмент, который
    позволяет через интуитивно понятный интерфейс выполнить настройку
    любых модулей микроконтроллера. В результате генерации кода мы, в
    свою очередь, получаем готовый проект, в котором уже настроено,
    все что было ранее выбрано в CubeMx. И мы можем дополнять этот
    проект своим функционалом, используя уже сконфигурированные
    автоматически периферийные модули.
  </p>`
},
]

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Массив для страницы "Видеоматериалы"

const videos = [
  {
    title: 'Вводная лекция',
    content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/qruwVBaNRsI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    title: 'Сборка первого проекта',
    content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/eMGKPx5rwMI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    title: 'Ядро Cortex-M0',
    content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/z8AqQY_WKKo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    title: 'Система тиктирования и сброса',
    content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/PP94Q0OYLkY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    title: 'Порты ввода-вывода',
    content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ynBOKPnYlyY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
];

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Массив для страницы "Тесты"

const tests = [
  {
    title: 'STM32',
    content: ` <div class="question">
    <p>Вопрос 1: STM32 - это</p>
    <input type="radio" name="q1" value="1"> Семейство микроконтроллеров производства STMicroelectronics<br>
    <input type="radio" name="q1" value="2"> Серия недорогих микросхем с малым энергопотреблением китайской компании Espressif System<br>
    <input type="radio" name="q1" value="3"> Микроконтроллер китайского производителя Espressif System с интерфейсом Wi-Fi<br>
  </div>
  <br/>
  <div class="question">
    <p>Вопрос 2: Из скольки серий микроконтроллеров состоит семейство микроконтроллеров STM32?</p>
    <input type="radio" name="q2" value="1"> 9<br>
    <input type="radio" name="q2" value="2"> 12<br>
    <input type="radio" name="q2" value="3"> 16<br>
  </div>
  <br/>
  <div class="question">
    <p>Вопрос 3: На какие серии производитель делит микроконтроллеры STM32? (Выберите неверный)</p>
    <input type="radio" name="q3" value="1"> Высокопроизводительные<br>
    <input type="radio" name="q3" value="2"> Сверхнизкого потребления<br>
    <input type="radio" name="q3" value="3"> Беспроводные<br>
  </div>
  <br/>
  <button onclick="checkAnswers(test1)">Проверить ответы</button>
  <br/><br/>
  <div class="result" id="result" style="text-align: center"></div>`
  },
  {
    title: 'Система тактирования',
    content: `<div class="question">
    <p>Вопрос 1: Частоты HCLK, FCLK, PCLK1, TIMXCLK, PCLK2, TIM1CLK равны</p>
    <input type="radio" name="q1" value="1"> 10 МГц<br>
    <input type="radio" name="q1" value="2"> 6 МГц<br>
    <input type="radio" name="q1" value="3"> 8 МГц<br>
  </div>
  <br/>
  <div class="question">
    <p>Вопрос 2: Частота Cortex System Timer равна</p>
    <input type="radio" name="q2" value="1"> 20 МГц<br>
    <input type="radio" name="q2" value="2"> 5 МГц<br>
    <input type="radio" name="q2" value="3"> 1 МГц<br>
  </div>
  <br/>
  <div class="question">
    <p>Вопрос 3: Какая частота у генератора LSI RC oscillator?</p>
    <input type="radio" name="q3" value="1"> 40 Гц<br>
    <input type="radio" name="q3" value="2"> 35 Гц<br>
    <input type="radio" name="q3" value="3"> 50 Гц<br>
  </div>
  <br/>
  <button onclick="checkAnswers(test2)">Проверить ответы</button>
  <br/><br/>
  <div class="result" id="result" style="text-align: center"></div>`
  },
  {
    title: 'Генераторы тактового сигнала',
    content: `<div class="question">
    <p>Вопрос 1: В микроконтроллерах STM32F103x8/B присутствует несколько генераторов тактового сигнала, выберите лишний</p>
    <input type="radio" name="q1" value="1"> High-speed Internal (HSI)<br>
    <input type="radio" name="q1" value="2"> High-speed (HS)<br>
    <input type="radio" name="q1" value="3"> Low-speed External (LSE)<br>
  </div>
  <br/>
  <div class="question">
    <p>Вопрос 2: Какая частота у генератора HSI RC oscillator?</p>
    <input type="radio" name="q2" value="1"> 10 Гц<br>
    <input type="radio" name="q2" value="2"> 8 Гц<br>
    <input type="radio" name="q2" value="3"> 6 Гц<br>
  </div>
  <br/>
  <div class="question">
  <p>Вопрос 3: Какая частота у генератора LSI RC oscillator?</p>
    <input type="radio" name="q3" value="1"> 40 Гц<br>
    <input type="radio" name="q3" value="2"> 35 Гц<br>
    <input type="radio" name="q3" value="3"> 50 Гц<br>
  </div>
  <br/>
  <button onclick="checkAnswers(test3)">Проверить ответы</button>
  <br/><br/>
  <div class="result" id="result" style="text-align: center"></div>`
  },
]

const test1 = [1, 3, 3]
const test2 = [2, 3, 1]
const test3 = [2, 2, 1]