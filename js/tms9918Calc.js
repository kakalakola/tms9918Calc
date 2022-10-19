let outputSize=0
    ,data
    ;

const chip={'tms9918':{
          'description':'Standard TMS9918. Used in a buttload of consoles.'
          ,'vdpRegCode':[0x80,0x81,0x82,0x83,0x84,0x85,0x86,0x87]
          ,'vdpRegs':[
            {
              'title':'Register 00'
              ,'description':'Mode Control 01'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'M3 - Mode select','type':'check'}
                ,{'desc':'Enable external video sync','type':'check'}
              ]
            }
            ,{
              'title':'Register 01'
              ,'description':'Mode Control 02'
              ,'content':[
                {'desc':'Video RAM 4Kb|16Kb','type':'check','checked':true}
                ,{'desc':'Display enable','type':'check'}
                ,{'desc':'Generate IRQ','type':'check'}
                ,{'desc':'M1 - Mode select','type':'check'}
                ,{'desc':'M2 - Mode select','type':'check'}
                ,{'desc':'x'}
                ,{'desc':'Sprite Size 8x8|16x16','type':'check'}
                ,{'desc':'Sprite Magnification 1x|2x','type':'check'}
              ]
              ,'note':'There are 4 official/valid modes, selectable by setting the individual bits.<br> - Graphics Mode is selected by setting all mode bits to 0<br> - Text Mode is selected by setting M1 *only*<br>- Multicolor Mode is selected by setting M2 *only*<br> - Graphics Mode II is selected by setting M3 *only*<br><br>Other modes are considered undocumented.'
            }
            ,{
              'title':'Register 02'
              ,'description':'Tile Map Base Address'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Address (multiple of $0400): $','type':'text'}
              ]
              ,'note':'Bits 3-0 corresponds to bits 13-10 of the address.'
            }
            ,{
              'title':'Register 03'
              ,'description':'Color Table Base Address'
              ,'content':[{'desc':'Address (multiple of $0040): $','type':'text'}]
              ,'note':'Bits 7-0 corresponds to bits 13-6 of the address.'
            }
            ,{
              'title':'Register 04'
              ,'description':'BG Tile Base Address'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Address (multiple of $0800): $','type':'text','size':'2'}
              ]
              ,'note':'Bits 2-0 corresponds to bits 13-11 of the address.'
            }
            ,{
              'title':'Register 05'
              ,'description':'Sprite Attribute Table Base Address'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'Address (multiple of $0080): $','type':'text','size':'2'}
              ]
              ,'note':'Bits 6-0 corresponds to bits 13-7 of the address.'
            }
            ,{
              'title':'Register 06'
              ,'description':'Sprite Tile Base Address'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Address (multiple of $0800): $','type':'text','size':'2'}
              ]
              ,'note':'Bits 2-0 corresponds to bits 13-11 of the address.'
            }
            ,{
              'title':'Register 07'
              ,'description':'Text & Background Color'
              ,'content':[
                {'desc':'Text color (in text mode) ','type':'select'
                  ,'options':[
                    ['00',0],['01',1],['02',2],['03',3],['04',4],['05',5],['06',6],['07',7]
                    ,['08',8],['09',9],['0A',10],['0B',11],['0C',12],['0D',13],['0E',14],['0F',15]
                  ]
                }
                ,{'desc':'Background color ','type':'select'
                  ,'options':[
                    ['00',0],['01',1],['02',2],['03',3],['04',4],['05',5],['06',6],['07',7]
                    ,['08',8],['09',9],['0A',10],['0B',11],['0C',12],['0D',13],['0E',14],['0F',15]
                  ]
                }
              ]
            }
            ,{
              'title':'Output'
              ,'content':[
                {'desc':'Include Register number','type':'check'}
                ,{'desc':'Compact','type':'check','checked':true}
                ,{'desc':'Reverse data order','type':'check'}
              ]
            }
            ,{
              'title':'External Links'
              ,'note':'<a href="https://map.grauw.nl/resources/video/ti-vdp-programmers-guide.pdf" target="_blank" rel="noopener">Texas Instruments Video Display Processor Programmer\'s Guide</a> (pdf)<br><a href="https://www.smspower.org/Development/TMS9918ArizonaTechnicalSymposiumDraft" target="_blank" rel="noopener">TMS9918 Arizona Technical Symposium Draft</a> - smspower.org'
              ,'noOutput':true
            }
          ]
        }
        ,'sega8VDP':{
          'description':'SEGA\'s variant of the TMS9918. Used in the SEGA Mark III/Master System and Game Gear.'
          ,'vdpRegCode':[0x80,0x81,0x82,0x83,0x84,0x85,0x86,0x87,0x88,0x89,0x8a]
          ,'vdpRegs':[
            {
              'title':'Register 00'
              ,'description':'Mode Control 01'
              ,'content':[
                {'desc':'Vertical scroll lock','type':'check'}
                ,{'desc':'Horizontal scroll lock','type':'check'}
                ,{'desc':'Hide leftmost 8 pixels','type':'check'}
                ,{'desc':'Enable line interrupts','type':'check'}
                ,{'desc':'Shift sprites 8 pixels to the left','type':'check'}
                ,{'desc':'M4 - Mode select (TMS9918|Mode 4)','type':'check','checked':true}
                ,{'desc':'M3 - Enable extra height mode','type':'check'}
                ,{'desc':'Enable external video sync (not used)','type':'check','unused':true}
              ]
              ,'note':'Vertical scroll lock fixes the 8 rightmost columns (64 pixels) of the screen with a Y scroll value of 0.<br><br>Horizontal scroll lock fixes the top two rows of the screen (16 pixels) with an X scroll value of 0.<br><br>Extra height mode bit has be set for 224 and 240 line mode.'
            }
            ,{
              'title':'Register 01'
              ,'description':'Mode Control 02'
              ,'content':[
                {'desc':'Video RAM 4Kb|16Kb','type':'check','checked':true}
                ,{'desc':'Display enable','type':'check'}
                ,{'desc':'Generate IRQ','type':'check'}
                ,{'desc':'M1 - 224 line mode','type':'check'}
                ,{'desc':'M2 - 240 line mode','type':'check'}
                ,{'desc':'x'}
                ,{'desc':'Sprite Size 8x8|8x16','type':'check'}
                ,{'desc':'Sprite Magnification 1x|2x','type':'check'}
              ]
              ,'note':'Official documentation suggests always setting bit 7 (4Kb|16Kb VRAM) to 1 for Mode 4<a href="#m3srm" class="reference">[1]</a>.<br><br>224 line mode and 240 line mode are only available in the SEGA 315-5246 VDP, used in the Master System II. M3 needs to be set in order to access extra height mode.<br><br>Due to a hardware glitch bit 0 (sprite magnification) should always be set to 0<a href="#m3srm" class="reference">[1]</a>. Only the first four sprites in a given scanline are scaled horizontally and vertically. The remaining four sprites are scaled vertically only.'
            }
            ,{
              'title':'Register 02'
              ,'description':'Tile Map Base Address'
              ,'content':[
                {'desc':'x','checked':true}
                ,{'desc':'x','checked':true}
                ,{'desc':'x','checked':true}
                ,{'desc':'x','checked':true}
                ,{'desc':'Address (multiple of $0800): $','type':'text'}
                ,{'desc':'Mask bit','type':'check','checked':true}
              ]
              ,'note':'Bits 3-1 corresponds to bits 13-11 of the address. If 224 or 240 line display is enabled, bit 1 of the address is ignored.<br><br>In the SMS VDP, bit 0 acts as the mask bit. The value is AND-ed with the highest bit of the address. It should always be set to 1<a href="#m3srm" class="reference">[1]</a>. Unused bits should be set to 1<a href="#m3srm" class="reference">[1]</a>.'
            }
            ,{
              'title':'Register 03'
              ,'description':'Color Table Base Address'
              ,'content':[
                {'desc':'Color table base address : $','type':'text','maxLength':'2','defaultValue':'ff'}
              ]
              ,'note':'Should be set to $FF<a href="#m3srm" class="reference">[1]</a>.'
              ,'noOutput':true
            }
            ,{
              'title':'Register 04'
              ,'description':'BG Tile Base Address'
              ,'content':[
                {'desc':'Background tile base address : $','type':'text','maxLength':'2','defaultValue':'ff'}
              ]
              ,'note':'Should be set to $FF<a href="#m3srm" class="reference">[1]</a>.' 
              ,'noOutput':true
            }
            ,{
              'title':'Register 05'
              ,'description':'Sprite Attribute Table Base Address'
              ,'content':[
                {'desc':'x','checked':true}
                ,{'desc':'Address (multiple of $0100): $','type':'text'}
                ,{'desc':'Mask bit','type':'check','checked':true}
              ]
              ,'note':'Bits 6-1 corresponds to bits 13-8 of the address. For mode 4 on the Mark III/ Master System, bit 0 should be set to 1. The mask bit is AND-ed with the highest bit of the X position and tile number of a given sprite. Setting the mask bit to 0 will result in incorrect sprite position and tile.<br><br>Bit 0 is usused in Master System II and Game Gear.<br><br>Unused bits should be set to 1<a href="#m3srm" class="reference">[1]</a>.'
            }
            ,{
              'title':'Register 06'
              ,'description':'Sprite Tile Base Address'
              ,'content':[
                {'desc':'x','checked':true}
                ,{'desc':'x','checked':true}
                ,{'desc':'x','checked':true}
                ,{'desc':'x','checked':true}
                ,{'desc':'x','checked':true}
                ,{'desc':'Address (multiple of $2000): $','type':'text'}
                ,{'desc':'Mask bit 1','type':'check','checked':true}
                ,{'desc':'Mask bit 0','type':'check','checked':true}
              ]
              ,'note':'Bit 2 corresponds to bit 13 of the address. For mode 4 on the Mark III/ Master System, bits 1 & 0 should be set to 1. Mask bits are AND-ed with the highest bits of the tile number. So setting either or both of them to 0 can reduce the number of available tiles from 256 to 192, 128, or 64.<br><br>Unused bits should be set to 1<a href="#m3srm" class="reference">[1]</a>.'
            }
            ,{
              'title':'Register 07'
              ,'description':'Overscan/Background Color'
              ,'content':[
                {'desc':'x','checked':true}
                ,{'desc':'x','checked':true}
                ,{'desc':'x','checked':true}
                ,{'desc':'x','checked':true}
                ,{
                  'desc':'Overscan/Background Color (from sprite palette) '
                  ,'type':'select'
                  ,'options':[
                    ['00',0],['01',1],['02',2],['03',3],['04',4],['05',5],['06',6],['07',7]
                    ,['08',8],['09',9],['0A',10],['0B',11],['0C',12],['0D',13],['0E',14],['0F',15]
                  ]
                }
              ]
              ,'note':'Unused bits should be set to 1<a href="#m3srm" class="reference">[1]</a>.'
            }
            ,{
              'title':'Register 08'
              ,'description':'Background X Scroll'
              ,'content':[{'desc':'Background X Scroll: $','type':'text','maxLength':'2','defaultValue':'00'}]
              ,'note':'Nothing to calculate.'
              ,'noOutput':true
            }
            ,{
              'title':'Register 09'
              ,'description':'Background Y Scroll'
              ,'content':[{'desc':'Background Y Scroll: $','type':'text','maxLength':'2','defaultValue':'00'}]
              ,'note':'Nothing to calculate. Depending on the model SMS/SMS2, the vertical resolution might be 192, 224, or 240 lines.'
              ,'noOutput':true
            }
            ,{
              'title':'Register 0A'
              ,'description':'Scanline Counter'
              ,'content':[{'desc':'Scanline Counter: $','type':'text','maxLength':'2','defaultValue':'00'}]
              ,'note':'Nothing to calculate. Depending on the model SMS/SMS2, the vertical resolution might be 192, 224, or 240 lines. Setting line counter to "0" seems to cause IRQ to trigger non stop.'
              ,'noOutput':true
            }
            ,{
              'title':'Output'
              ,'content':[
                {'desc':'Include register number','type':'check','checked':true}
                ,{'desc':'Compact','type':'check','checked':true}
                ,{'desc':'Reverse data order','type':'check'}
              ]
            }
            ,{
              'title':'Reference'
              ,'note':'<span id="m3srm">1. </span> <a href="https://segaretro.org/File:SoftwareReferenceManualForSegaMarkIIIEU.pdf" target="_blank" rel="noopener">SoftwareReferenceManualForSegaMarkIIIEU.pdf</a> - segaretro.org'
              ,'noOutput':true
            }
            ,{
              'title':'External Links'
              ,'note':'<a href="https://segaretro.org/File:Sega_Game_Gear_Hardware_Reference_Manual.pdf" target="_blank" rel="noopener">Sega Game Gear Hardware Reference Manual.pdf</a> - segaretro.org<br><br><a href="https://www.smspower.org/uploads/Development/msvdp-20021112.txt" target="_blank" rel="noopener">msvdp-20021112.txt</a> by Charles MacDonald - segaretro.org'
              ,'noOutput':true
            }
          ]
        }
        ,'sega16VDP':{
          'description':'SEGA 315-5313, a TMS9918 based custom VDP. Used in the SEGA Mega Drive/Genesis. Backwards compatible with the Master System & Game Gear VDPs, but not the original TMS9918.'
          ,'vdpRegCode':[0x80,0x81,0x82,0x83,0x84,0x85,0x86,0x87,0x88,0x89,0x8a,0x8b,0x8c,0x8d,0x8e,0x8f,0x90,0x91,0x92]
          ,'outputSize':4
          ,'vdpRegs':[
            {
              'title':'Register 00'
              ,'description':'Mode Control 01'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Enable line interrupts','type':'check'}
                ,{'desc':'x'}
                ,{'desc':'M4 (Used to set 2BPP|3BPP color in Mode V)','type':'check','checked':true}
                ,{'desc':'M3 (Disable H/V counter)','type':'check'}
                ,{'desc':'Enable external video sync (not used)','type':'check','unused':true}
              ]
              //,'note':'??'
            }
            ,{
              'title':'Register 01'
              ,'description':'Mode Control 02'
              ,'content':[
                {'desc':'Video RAM 64Kb|128Kb','type':'check','unused':true}
                ,{'desc':'Display enable','type':'check'}
                ,{'desc':'Generate V Int','type':'check'}
                ,{'desc':'M1 (DMA Enable)','type':'check'}
                ,{'desc':'M2 (Video mode NTSC|PAL)','type':'check'}
                ,{'desc':'Mode Select (Mode IV|Mode V)','type':'check','checked':true}
                ,{'desc':'x'}
                ,{'desc':'x'}
              ]
              ,'note':'Disabling Mode V Select puts the VDP into Master System compatibility mode. However, backwards compatibility with TMS9918 is not maintained. Master System games that use TMS9918 video modes [ref?] do not work with the SEGA Power Base Converter.'
            }
            ,{
              'title':'Register 02'
              ,'description':'Scroll A Tile Map Base Address'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'Use extended ($10000+) address','type':'check','unused':true}
                ,{'desc':'Address (multiple of $2000): $','type':'text'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
              ] 
              ,'note':'Uses bits 5-3 as bits 15-13'
            }
            ,{
              'title':'Register 03'
              ,'description':'Window Tile Map Base Address'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'Use extended ($10000+) address','type':'check','unused':true}
                ,{'desc':'Address (multiple of $0800): $','type':'text'}
                ,{'desc':'x'}
              ] 
              ,'note':'Uses bits 5-1 as bits 15-11'
            }
            ,{
              'title':'Register 04'
              ,'description':'Scroll B Tile Map Base Address'
              ,'content':[
                {'desc':'Use extended ($10000+) address','type':'check','unused':true}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Address (multiple of $2000): $','type':'text'}
              ] 
              ,'note':'Uses bits 2-0 as bits 15-13'
            }
            ,{
              'title':'Register 05'
              ,'description':'Sprite Attribute Table Base Address'
              ,'content':[
                {'desc':'Use extended ($10000+) address','type':'check','unused':true}
                ,{'desc':'Address (multiple of $0200): $','type':'text'}
              ]
              ,'note':'Uses bits 6-0 as bits 15-9'
            }
            ,{
              'title':'Register 06','unused':true
              ,'description':'Extended Sprite Tile Base Address'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Use extended ($10000+) address','type':'check'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
              ]
              ,'note':'Not used in official hardware.'
            }
            ,{
              'title':'Register 07'
              ,'description':'Background Color'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Palette ','type':'select'
                  ,'options':[['00',0],['01',1],['02',2],['03',3]]
                }
                ,{'desc':'Color ','type':'select'
                  ,'options':[
                    ['00',0],['01',1],['02',2],['03',3],['04',4],['05',5],['06',6],['07',7]
                    ,['08',8],['09',9],['0A',10],['0B',11],['0C',12],['0D',13],['0E',14],['0F',15]
                  ]
                }
              ]
            }
            ,{
              'title':'Register 08','unused':true
              ,'description':'Background X Scroll in Mode IV'
              ,'content':[{'desc':'Background X Scroll (8-bit): $','type':'text','maxLength':'2','defaultValue':'00','unused':true}]
              ,'note':'Ignored in Mode 5. Here for the sake of documentation.'
            }
            ,{
              'title':'Register 09','unused':true
              ,'description':'Background Y Scroll in Mode IV'
              ,'content':[{'desc':'Background Y Scroll (8-bit): $','type':'text','maxLength':'2','defaultValue':'00','unused':true}]
              ,'note':'Ignored in Mode 5. Here for the sake of documentation.'
            }
            ,{
              'title':'Register 0A'
              ,'description':'Scanline Counter'
              ,'content':[{'desc':'Scanline counter: $','type':'text','maxLength':'2','defaultValue':'00'}]
              ,'note':'NOTE: Once set, the HBLank line counter can only be updated in the middle of an active HBlank. Furthermore, a change to HBlank counter takes an additional interrupt to become active. For example, if the line counter is set to $10, and changed to $07 during the first H interrupt at line $10, there will be a second interrup at line $20, and the THIRD H interrupt will be at line 27.'
            }
            ,{
              'title':'Register 0B'
              ,'description':'Mode Set Register 03'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'External (Level 2) Interrupt Enable','type':'check'}
                ,{'desc':'Vertical Scroll ','type':'select'
                  ,'options':[['Full Screen',0],['16 Pixel Column',1]]
                }
                ,{'desc':'Horizontal Scroll ','type':'select'
                  ,'options':[['Full Screen',0],['Prohibited',1],['8 Pixel Row',2],['Individual Line',3]]
                }
              ]
              ,'note':'For scrolling, the high word scrolls plane A, the low word scrolls plane B.'
            }
            ,{
              'title':'Register 0C'
              ,'description':'Mode Set Register 04'
              ,'content':[
                {'desc':'Horizontal Resolution 256|320 pixel','type':'check'}
                ,{'desc':'Might do something with HSync','type':'check','unused':true}
                ,{'desc':'Replace VSync With Pixel Clock Signal','type':'check','unused':true}
                ,{'desc':'Enable External Pixel Bus','type':'check','unused':true}
                ,{'desc':'Shadow/Highlight Mode Enable','type':'check'}
                ,{'desc':'Interlace Mode ','type':'select'
                  ,'options':[['No Interlace',0],['Interlace',1],['Prohibited',2],['Interlace (2x Resolution)',3]]
                }
                ,{'desc':'Horizontal Resolution 256|320 pixel','type':'check'}
              ]
              ,'note':'Bit 7 should match bit 0.'
            }
            ,{
              'title':'Register 0D'
              ,'description':'Horizontal Scroll Data Address'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'Use extended ($10000+) address','type':'check','unused':true}
                ,{'desc':'Address (multiple of $0400): $','type':'text'}
              ]
              ,'note':'Uses bits 5-0 as address bits 15-10.<br><br>At a maximum height of 128 ($80) cells, 1024 ($400) bytes are needed if each line is to be individually scrolled.'
            }
            ,{
              'title':'Register 0E','unused':true
              ,'description':'Nametable Tile Base Address Extension'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Use extended ($10000+) address for plane B','type':'check','unused':true}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Use extended ($10000+) address for plane A and Window','type':'check','unused':true}
              ]
              ,'note':'Not used in official hardware.'
            }
            ,{
              'title':'Register 0F'
              ,'description':'Address Auto-Increment'
              ,'content':[{'desc':'VRAM address auto increment after read/write: $','type':'text','maxLength':'2','defaultValue':'02'}]
              ,'note':'Usually set to $02 (Word)'
            }
            ,{
              'title':'Register 10'
              ,'description':'Map Size (applies to both layers)','content':[
                {'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Height ','type':'select'
                  ,'options':[['32 Tile',0],['64 Tile',1],['Prohibited',2],['128 Tile',3]]
                }
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Width ','type':'select'
                  ,'options':[['32 Tile',0],['64 Tile',1],['Prohibited',2],['128 Tile',3]]
                }
              ]
              ,'note':'NOTE: Selecting between the 32 or 40 Tile mode modifies Window Nametable and Sprite Attribute Table addresses to be multiples of $800 & $200, or $1000 & $400, respectively. Also, dimensions can\'t be equal or higher than 8192 tiles. So 64x128 tiles (8192) or 128x128 tiles (16,384) are not valid configurations.'
            }
            ,{
              'title':'Register 11'
              ,'description':'Window Horizontal Position (in 2x Tiles)'
              ,'content':[
                {'desc':'Right','type':'check'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Address (range $00-$1f): $','type':'text','maxLength':'2','defaultValue':'00'}
              ]
              ,'note':'The horizontal position of Window is calculated from the left side of the screen by default.'
            }
            ,{
              'title':'Register 12'
              ,'description':'Window Vertical Position (in 2x Tiles)'
              ,'content':[
                {'desc':'Down','type':'check'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Address  (range $00-$1f): $','type':'text','maxLength':'2','defaultValue':'00'}
              ]
              ,'note':'The vertical position of Window is calculated from the top of the screen by default.'
            }
            ,{
              'title':'DMA Registers'
              ,'description':'$13-$17'
              ,'note':'DMA Size & Address calculations are best done with code.<br><br>Setting DMA Length:<br>#$9300+((length>>1)&$00ff)<br>#$9400+((length>>9)&$00ff)<br><br>Setting DMA Source Address (68K):<br>#$9500+(sourceAddress>>1)&$00ff)<br>#$9600+((sourceAddress>>9)&$00ff)<br>#$9700+((sourceAddress>>17)&$00ff)<br><br>Setting DMA Fill:<br>#$9500,#$9600,#$9780 (The fill value needs to be written to the VDP data port)'
            }
            ,{
              'title':'General VDP Read/Write'
              ,'description':'VDP Command Calculator'
              ,'outputSize':8
              ,'content':[
                {'desc':'VRAM Address ($0000-$FFFF): $','type':'text'}
                ,{'desc':'Mode: ','type':'select'
                  ,'options':[
                    ['VRAM Read',0],['VRAM Write',1,true],['CRAM Read',8],['CRAM Write',3],['VSRAM Read',4],['VSRAM Write',5]
                    ,['DMA 68K->VRAM',33],['DMA 68K->CRAM',35],['DMA 68K->VSRAM',37],['DMA VRAM Fill',33]
                  ]
                }
              ]
              ,'note':'VRAM Fill is the same command as 68K -> VRAM copy. But writing a byte to the VRAM Data Port fills the VRAM with said byte, instead of copying data from the 68k side.<br><br>CRAM & VSRAM are 128 ($80) bytes in length. For VSRAM, this is precisely the amount of memory needed to independently scroll a maximum of 128 cells.'
            }
            ,{
              'title':'CRAM Read/Write'
              ,'description':'VDP Command Calculator'
              ,'outputSize':8
              ,'content':[
                {'desc':'Palette ','type':'select'
                  ,'options':[['00',0],['01',1],['02',2],['03',3]]
                }
                ,{'desc':'Color ','type':'select'
                  ,'options':[
                    ['00',0],['01',1],['02',2],['03',3],['04',4],['05',5],['06',6],['07',7]
                    ,['08',8],['09',9],['0A',10],['0B',11],['0C',12],['0D',13],['0E',14],['0F',15]
                  ]
                }
                ,{'desc':'Color ','type':'select'
                  ,'options':[
                    ['CRAM Read',8],['CRAM Write',3,true],['DMA 68K->CRAM',35]
                  ]
                }
              ]
              ,'note':'The same as the above function, basically. Here because it\'s slightly simpler to set Palette 3 Color 7 than trying to calculate the RAM index ($6E).'
            }
            ,{
              'title':'Output'
              ,'content':[
                {'desc':'Compact','type':'check','checked':true}
                ,{'desc':'Hide unused registers and data','type':'check','checked':true}
                ,{'desc':'Reverse data order','type':'check'}
              ]
            }
            ,{
              'title':'References'
              ,'note':'<a href="https://segaretro.org/File:Genesis_Software_Manual.pdf" target="_blank" rel="noopener">Genesis Software Manual.pdf</a> - segaretro.org'
              ,'noOutput':true
            }
          ]
        }
        ,'sega32XVDP':{
          'description':'SEGA 32X VDP. Doesn\'t really have much to do with anything. But I figure I\'d throw it in here just for the sake of completion.'
          ,'outputSize':4
          ,'vdpRegs':[
            {
              'title':'Register $4000'
              ,'description':'Interrupt Control'
              ,'content':[
                {'desc':'PWM timer interrupt Enable','type':'check'}
                ,{'desc':'CMD - Command interrupt Enable','type':'check'}
                ,{'desc':'H interrupt Enable','type':'check'}
                ,{'desc':'V interrupt Enable','type':'check'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'HEN - H interrupt approved, read only','type':'check','unused':true}
                ,{'desc':'CART - Cartridge not inserted, read only','type':'check','unused':true}
                ,{'desc':'ADEN - (32X) Adapter enabled, read only','type':'check','unused':true}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'FM - Framebuffer access mode (68K|SH2)','type':'check'}
              ]
              ,'note':'Technically *not* a 32X VDP register, but since it controls interrupts, I figure I\'d include it here.'
            }
            ,{
              'title':'Register $4100'
              ,'description':'Video Mode Control'
              ,'content':[
                {'desc':'Video Mode (PAL|NTSC)','type':'check'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Screen Priority (Genesis>32X|32x>Genesis)','type':'check'}
                ,{'desc':'Line Mode (224|240 lines)','type':'check'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Bitmap Mode ','type':'select'
                  ,'options':[['Video Off',0],['Packed Pixel',1,true],['Direct Color',2],['Run Length',3]]
                }
              ]
              ,'note':'A lot of unused bits.'
            }
            ,{
              'title':'Register $4102'
              ,'description':'Screen Shift Control Register'
              ,'content':[
                {'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Screen Shift Register','type':'check'}
              ]
              ,'note':'When set, scrolls the visible screen by 1 pixel to the left.'
            }
            ,{
              'title':'Register $4104'
              ,'description':'Auto Fill Length Register'
              ,'content':[
                {'desc':'Amount: $','type':'text','maxLength':'2','defaultValue':'00'}
              ]
              ,'note':'8-bit number, in the format of(length-1).'
            }
            ,{
              'title':'Register $4106'
              ,'description':'Auto Fill Start Address Register'
              ,'content':[
                {'desc':'Address: $','type':'text'}
              ]
              ,'note':'...a better description might be "Auto Fill Destination Address".'
            }
            ,{
              'title':'Register $4108'
              ,'description':'Auto Fill Data Register'
              ,'content':[
                {'desc':'Data: $','type':'text'}
              ]
              ,'note':'16-bit data to fill target address with.'
            }
            ,{
              'title':'Register $410A'
              ,'description':'Frame Buffer Control Register'
              ,'content':[
                {'desc':'V Blank Flag, read only','type':'check','unused':true}
                ,{'desc':'H Blank Flag, read only','type':'check','unused':true}
                ,{'desc':'Palette Access Denied|Approved, read only','type':'check','unused':true}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'x'}
                ,{'desc':'Frame Buffer Access Denied|Approved, read only','type':'check','unused':true}
                ,{'desc':'Transfer DRAM 0|DRAM 1 to the VDP side','type':'check'}
              ]
              ,'note':'When set, scrolls the visible screen by 1 pixel to the left. Unless one of the address in the line table data is #$FF.'
            }
            ,{
              'title':'Output'
              ,'content':[
                {'desc':'Compact','type':'check','checked':true}
              ]
            }
            ,{
              'title':'References'
              ,'note':'<a href="https://segaretro.org/File:32XUSHardwareManual.pdf" target="_blank" rel="noopener">32XUSHardwareManual.pdf</a> - segaretro.org'
              ,'noOutput':true
            }
          ]
        }
      }
      //Utility functions to generate HTML
      ,generateCheck=function(c){
        'use strict';
        let inDiv=document.createElement('div')
            ,inDesc=document.createElement('span')
            ,inCheck=document.createElement('input')
            ;
        inDesc.innerText=c.desc;
        inCheck.setAttribute('type','checkbox');

        if(c.checked){
          inCheck.checked=true;
        }

        if(c.unused){
          inDiv.setAttribute('class','unused');
        }

        inDiv.appendChild(inCheck);
        inDiv.appendChild(inDesc);

        return inDiv;
      }

      ,generateCheckUndefined=function(c){
        'use strict';
        let inDiv=document.createElement('div')
            ,inDesc=document.createElement('span')
            ,inCheck=document.createElement('input')
            ;
        inDiv.setAttribute('class','unused');
        inDesc.innerText='Unused';

        inCheck.setAttribute('type','checkbox');

        //I'm surprised this works, but I'm not complaining
        inCheck.checked=(c.checked?true:null);

        inDiv.appendChild(inCheck);
        inDiv.appendChild(inDesc);
        return inDiv;
      }

      ,generateSelect=function(c){
        'use strict';
        let inDiv=document.createElement('div')
            ,inDesc=document.createElement('span')
            ,inSelect=document.createElement('select')
            ;
        inDesc.innerText=c.desc;
        c.options.forEach(function(o){
          let opt=document.createElement('option');
          opt.innerText=o[0];
          opt.value=o[1];
          if(o[2]!==undefined && o[2]){
            opt.selected=true;
          }
          inSelect.appendChild(opt);
        });
        inDiv.appendChild(inDesc);
        inDiv.appendChild(inSelect);
        return inDiv;
      }

      ,generateText=function(c){
        let inDiv=document.createElement('div')
            ,inDesc=document.createElement('span')
            ,inText=document.createElement('input')
            ;
        inDesc.innerText=c.desc;
        inText.setAttribute('class','textInput_'+(c.maxLength===undefined?'4':c.maxLength));
        inText.setAttribute('type','text');

        inText.setAttribute('maxlength',(c.maxLength===undefined?'4':c.maxLength));
        inText.setAttribute('placeholder',(c.defaultValue===undefined?'0000':c.defaultValue));
        inText.value=(c.defaultValue===undefined?'0000':c.defaultValue);
        inDiv.appendChild(inDesc);
        inDiv.appendChild(inText);
        return inDiv;
      }

      ,generateNote=function(reg){
        'use strict';
        let note=document.createElement('div');
        note.setAttribute('class','note');
        note.innerHTML=reg.note;
        return note;
      }

      ,generateOutput=function(reg){
        'use strict';
        let outDiv=document.createElement('div')
            ,outText=document.createElement('input')
            ,outSize=(reg.outputSize===undefined?outputSize:reg.outputSize)
            ;
        outText.setAttribute('class','output output_'+outSize);
        outText.setAttribute('maxlength',outSize);
        outText.setAttribute('type','text');
        switch(outSize){
          case 4:
            outText.value='0000';
            break;
          case 8:
            outText.value='00000000';
            break;
          default:
            outText.value='00';
        }
        outDiv.innerHTML=outTextLabel;
        outDiv.appendChild(outText);
        return outDiv;
      }

      ,generateOutputTextArea=function(){
        'use strict';
        let outDiv=document.createElement('div')
            ,outText=document.createElement('textArea')
            ;
        outText.value='Placeholder output text. Should be overwritten by the program. :)';
        outDiv.appendChild(outText);
        return outDiv;
      }

      //Utility function to process numbers
      ,intToHex=function(num,pad){
        let output='00000000'+(Number(num).toString(16));
        output=output.substring(output.length-(pad===undefined?4:pad));
        return output;
      }

      ,processBitArray=function(start,size){
        'use strict';
        let output=0
            ,i=0
            ;
        for(i=0;i<size;i+=1){
          output+=(document.getElementsByTagName('input')[i+start].checked?1:0)<<size-(i+1);
        }
        return output;
      }

      ,processAddress=function(start,bitStart,bitEnd,destinationOffset){
        'use strict';
        let addressLoc=document.getElementsByTagName('input')[start]
            ,address=parseInt(addressLoc.value,16)
            ,min=1<<bitEnd
            ,max=min
            ,i=bitEnd
            ;
        //Check for NaN
        address=(address!==address?0:address);
        for(i=bitEnd;i<=bitStart;i+=1){
          max+=1<<i;
        }

        address=(address-(address%min))%max;

        addressLoc.value=intToHex(address,parseInt(addressLoc.maxLength));
        return (address>>(destinationOffset===undefined?bitEnd:destinationOffset));
      }
      ,readHex=function(index){
        'use strict';
        let output=parseInt(document.getElementsByTagName('input')[index].value,16);
        output=(output!==output?0:output);
        document.getElementsByTagName('input')[index].value=intToHex(output,document.getElementsByTagName('input')[index].maxLength);
        return output;
      }

      ,updateOutput=function(outputIndex,padding){
        'use strict';
          document.getElementsByClassName('output')[outputIndex].value=intToHex(data.output[outputIndex],padding===undefined?2:padding);
      }

      ,updateFields=function(inputIndex,dataIndex,outputIndex,padding){
        'use strict';
        document.getElementsByTagName('input')[inputIndex].value=intToHex(data.input[dataIndex]);
        updateOutput(outputIndex,padding);
        
      }

      ,printCode=function(outCode){
        outCode=outCode.substring(0,outCode.length-1);
        document.getElementsByTagName('textarea')[0].value=outCode;
      }

      ,processTMS9918=function(order){
        'use strict';
        let outCode='  ;TMS9918 Register Configuration\n'
            ,outputStat=((document.getElementsByTagName('input')[44].checked?1:0)<<1)+(document.getElementsByTagName('input')[45].checked?1:0)
            ,reverse=(document.getElementsByTagName('input')[46].checked?1:0)
            ;
        data={
          'output':[]
          ,'reg':[]
        };

        if(order){
          //Process register 00
          data.output[0]=processBitArray(0,8);
          updateOutput(0);
          //Process register 01
          data.output[1]=processBitArray(9,8);
          updateOutput(1);
          //Process register 02
          data.output[2]=(processBitArray(18,4)<<4);
          data.output[2]+=processAddress(22,13,10);
          updateOutput(2);
          //Process register 03
          data.output[3]=processAddress(24,13,6);
          updateOutput(3);
          //Process register 04
          data.output[4]=(processBitArray(26,5)<<3);
          data.output[4]+=processAddress(31,13,11);
          updateOutput(4);
          //Process register 05
          data.output[5]=(processBitArray(33,1)<<7);
          data.output[5]+=processAddress(34,13,7);
          updateOutput(5);
          //Process register 06
          data.output[6]=(processBitArray(36,5)<<3);
          data.output[6]+=processAddress(41,13,11);
          updateOutput(6);
          //Process register 07          
          data.output[7]=(parseInt(document.getElementsByTagName('select')[1].value)<<4)+parseInt(document.getElementsByTagName('select')[2].value);
          updateOutput(7);

        }else{
          console.log('Processing output, and setting input');
        }


        data.output.forEach(function(d,i){
          data.reg.push(chip.tms9918.vdpRegCode[i]);
        });

        if(reverse){
          data.output.reverse();
          data.reg.reverse();
        }
        switch(outputStat){
          case 0: //Just data
            data.output.forEach(function(o){outCode+='  .db $'+intToHex(o,2)+"\n";});
            break;
          case 1: //Compact data and registers
            outCode+='  .db ';
            data.output.forEach(function(o){outCode+='$'+intToHex(o,2)+',';});
            break;
          case 2: //Data and registers
            data.output.forEach(function(o,i){outCode+='  .db $'+intToHex(o,2)+',$'+intToHex(data.reg[i],2)+"\n";});
            break;
          case 3: //Compact data and registers
            outCode+='  .dw ';
            data.output.forEach(function(o,i){outCode+='$'+intToHex((data.reg[i]<<8)+o)+',';});
            break;
        }
        printCode(outCode);
      }


      ,processSEGA8VDP=function(order){
        'use strict';

        let outCode='  ;SEGA 315-5124/315-5246 VDP Register Configuration\n'
            ,outputStat=((document.getElementsByTagName('input')[48].checked?1:0)<<1)+(document.getElementsByTagName('input')[49].checked?1:0)
            ,reverse=(document.getElementsByTagName('input')[50].checked?1:0)
            ;
        data={
          'output':[]
          ,'reg':[]
        };

        if(order){
          //Process register 00
          data.output[0]=processBitArray(0,8);
          updateOutput(0);
          //Process register 01
          data.output[1]=processBitArray(9,8);
          updateOutput(1);
          //Process register 02
          data.output[2]=(processBitArray(18,4)<<4);
          data.output[2]+=processAddress(22,13,11,10);
          data.output[2]+=processBitArray(23,1);
          updateOutput(2);
          //Process register 03 - Nothing to process
          //Process register 04 - Nothing to process
          //Process register 05
          data.output[3]=(processBitArray(27,1)<<7);
          data.output[3]+=processAddress(28,13,8,7);
          data.output[3]+=processBitArray(29,1);
          updateOutput(3);
          //Process register 06
          data.output[4]=(processBitArray(31,5)<<3);
          data.output[4]+=processAddress(36,13,13,11);
          data.output[4]+=processBitArray(37,2);
          updateOutput(4);
          //Process register 07
          data.output[5]=(processBitArray(40,4)<<4)+parseInt(document.getElementsByTagName('select')[1].value);
          updateOutput(5);
          //Process register 08 - Nothing to process
          //Process register 09 - Nothing to process
          //Process register 0A - Nothing to process
        }else{
          console.log('Processing output, and setting input');
        }

        data.output.splice(3,0,readHex(25));
        data.output.splice(4,0,readHex(26));
        data.output.push(readHex(45));
        data.output.push(readHex(46));
        data.output.push(readHex(47));


        data.output.forEach(function(d,i){
          data.reg.push(chip.sega8VDP.vdpRegCode[i]);
        });

        if(reverse){
          data.output.reverse();
          data.reg.reverse();
        }

        switch(outputStat){
          case 0: //Just data
            data.output.forEach(function(o){outCode+='  .db $'+intToHex(o,2)+"\n";});
            break;
          case 1: //Compact data and registers
            outCode+='  .db ';
            data.output.forEach(function(o){outCode+='$'+intToHex(o,2)+',';});
            break;
          case 2: //Data and registers
            data.output.forEach(function(o,i){outCode+='  .db $'+intToHex(o,2)+',$'+intToHex(data.reg[i],2)+"\n";});
            break;
          case 3: //Compact data and registers
            outCode+='  .dw ';
            data.output.forEach(function(o,i){outCode+='$'+intToHex((data.reg[i]<<8)+o)+',';});
            break;
        }
        printCode(outCode);
      }

      ,processSEGA16VDP=function(order){
        'use strict';
        
        let outCode='  ;SEGA 315-5315 VDP Register Configuration'
            ,outputStat=(document.getElementsByTagName('input')[104].checked?1:0)
            ,clean=(document.getElementsByTagName('input')[105].checked?1:0)
            ,reverse=(document.getElementsByTagName('input')[106].checked?1:0)
            //Process VDP commands
            ,vdpCommand=parseInt(document.getElementsByTagName('select')[8].value)
            ,descText=document.getElementsByTagName('select')[8].parentNode.parentNode.getElementsByTagName('span')[0]
            ,vramInput=document.getElementsByTagName('select')[8].parentNode.parentNode.getElementsByTagName('input')[0]
            ,vdpAddress
            ;

        data={
          'output':[]
        };

        if(order){
          //Process register 00
          data.output[0]=processBitArray(0,8);
          data.output[0]+=chip.sega16VDP.vdpRegCode[0]<<8;
          updateOutput(0,4);
          //Process register 01
          data.output[1]=processBitArray(9,8);
          data.output[1]+=chip.sega16VDP.vdpRegCode[1]<<8;
          updateOutput(1,4);
          //Process register 02
          data.output[2]=(processBitArray(18,2)<<6);          
          data.output[2]+=processAddress(20,15,13,10);
          data.output[2]+=processBitArray(21,3);
          data.output[2]+=chip.sega16VDP.vdpRegCode[2]<<8;
          updateOutput(2,4);
          //Process register 03
          data.output[3]=(processBitArray(25,2)<<6);
          data.output[3]+=processAddress(27,15,11,10);
          data.output[3]+=processBitArray(28,1);
          data.output[3]+=chip.sega16VDP.vdpRegCode[3]<<8;
          updateOutput(3,4);
          //Process register 04
          data.output[4]=(processBitArray(30,5)<<3);
          data.output[4]+=processAddress(38,15,9,9);
          data.output[4]+=chip.sega16VDP.vdpRegCode[4]<<8;
          updateOutput(4,4);
          //Process register 05
          data.output[5]=(processBitArray(37,1)<<7);
          data.output[5]+=processAddress(38,15,9,9);
          data.output[5]+=chip.sega16VDP.vdpRegCode[5]<<8;
          updateOutput(5,4);
          //Process register 06
          data.output[6]=processBitArray(40,8);
          data.output[6]+=chip.sega16VDP.vdpRegCode[6]<<8;
          updateOutput(6,4);
          //Process register 07
          data.output[7]=(processBitArray(49,2)<<6);
          data.output[7]+=(parseInt(document.getElementsByTagName('select')[1].value)<<4);
          data.output[7]+=parseInt(document.getElementsByTagName('select')[2].value);
          data.output[7]+=chip.sega16VDP.vdpRegCode[7]<<8;
          updateOutput(7,4);
          //Process register 08
          data.output[8]=readHex(52);
          data.output[8]+=chip.sega16VDP.vdpRegCode[8]<<8;
          updateOutput(8,4);
          //Process register 09
          data.output[9]=readHex(54);
          data.output[9]+=chip.sega16VDP.vdpRegCode[9]<<8;
          updateOutput(9,4);
          //Process register 0A
          data.output[10]=readHex(56);
          data.output[10]+=chip.sega16VDP.vdpRegCode[10]<<8;
          updateOutput(10,4);
          //Process register 0B
          data.output[11]=(processBitArray(58,5)<<3);
          data.output[11]+=(parseInt(document.getElementsByTagName('select')[3].value)<<2);
          data.output[11]+=parseInt(document.getElementsByTagName('select')[4].value);
          data.output[11]+=chip.sega16VDP.vdpRegCode[11]<<8;
          updateOutput(11,4);
          //Process register 0C
          data.output[12]=(processBitArray(64,5)<<3);
          data.output[12]+=(parseInt(document.getElementsByTagName('select')[5].value)<<1);
          data.output[12]+=processBitArray(69,1);
          data.output[12]+=chip.sega16VDP.vdpRegCode[12]<<8;
          updateOutput(12,4);
          //Process register 0D
          data.output[13]=(processBitArray(71,2)<<6);
          data.output[13]+=processAddress(73,15,10,10);
          data.output[13]+=chip.sega16VDP.vdpRegCode[13]<<8;
          //data.output[3]+=processBitArray(28,1);
          updateOutput(13,4);
          //Process register 0E
          data.output[14]=processBitArray(75,8);
          data.output[14]+=chip.sega16VDP.vdpRegCode[14]<<8;
          updateOutput(14,4);
          //Process register 0F
          data.output[15]=readHex(84);
          data.output[15]+=chip.sega16VDP.vdpRegCode[15]<<8;
          updateOutput(15,4);
          //Process register 10
          data.output[16]=(processBitArray(86,2)<<6);
          data.output[16]+=(parseInt(document.getElementsByTagName('select')[6].value)<<4);
          data.output[16]+=(processBitArray(88,2)<<2);
          data.output[16]+=parseInt(document.getElementsByTagName('select')[7].value);
          data.output[16]+=chip.sega16VDP.vdpRegCode[16]<<8;
          updateOutput(16,4);
          //Process register 11
          data.output[17]=(processBitArray(91,3)<<5);
          data.output[17]+=processAddress(94,4,0);
          data.output[17]+=chip.sega16VDP.vdpRegCode[17]<<8;
          updateOutput(17,4);
          //Process register 12
          data.output[18]=(processBitArray(96,3)<<5);
          data.output[18]+=processAddress(99,4,0);
          data.output[18]+=chip.sega16VDP.vdpRegCode[18]<<8;
          updateOutput(18,4);

        }else{
          console.log('Processing output, and setting input');
        }

        if(reverse){
          data.output.reverse();
        }

        if(clean){
          data.output.splice(0xe,1);
          data.output.splice(9,1);
          data.output.splice(8,1);
          data.output.splice(6,1);
        }

        if(outputStat){
          data.output.forEach(function(o,i){
            if(i%8===0){
              outCode+='\n  dc.w ';
            }
            outCode+='$'+intToHex(o);
            if(i%8<7){
              outCode+=',';
            }
          });
        }else{
          outCode+='\n';
          data.output.forEach(function(o){outCode+='  .dc.w $'+intToHex(o)+"\n";});
        }
        printCode(outCode);

        //Update VDP command text
        switch(vdpCommand){
          case 8: //CRAM read
          case 3: //CRAM write
          case 35: //CRAM DMA
            //Update text for CRAM values
            descText.innerText='CRAM Address ($00-$7F): $';
            vramInput.setAttribute('class','textInput_2');
            vramInput.setAttribute('maxlength','2');
            vramInput.setAttribute('placeholder','00');
            vdpAddress=processAddress(101,6,0);
            break;
          case 4: //VSRAM read
          case 5: //VSRAM write
          case 37: //VSRAM DMA
            //Update text for VSRAM values
            descText.innerText='VSRAM Address ($00-$7F): $';
            vramInput.setAttribute('class','textInput_2');
            vramInput.setAttribute('maxlength','2');
            vramInput.setAttribute('placeholder','00');
            vdpAddress=processAddress(101,6,0);
            break;
          default:
            //Update text for VRAM values
            descText.innerText='VRAM Address ($0000-$FFFF): $';
            vramInput.setAttribute('class','textInput_4');
            vramInput.setAttribute('maxlength','4');
            vramInput.setAttribute('placeholder','0000');
            vdpAddress=readHex(101);
        }

        //JavaScript works with signed integers by default. The '>>>0' converts the signed number back to an unsigned number.
        vdpCommand=((vdpCommand&0x03c)<<2)+(((vdpCommand&3)<<30)>>>0)+((vdpAddress&0x3fff)<<16)+(vdpAddress>>14);
        document.getElementsByClassName('output_8')[0].value=intToHex(vdpCommand,8);

        //Handle CRAM VDP command
        vdpCommand=parseInt(document.getElementsByTagName('select')[11].value);
        vdpAddress=(parseInt(document.getElementsByTagName('select')[9].value)<<5)+(parseInt(document.getElementsByTagName('select')[10].value)<<1);
        vdpCommand=((vdpCommand&0x03c)<<2)+(((vdpCommand&3)<<30)>>>0)+((vdpAddress&0x3fff)<<16)+(vdpAddress>>14);
        document.getElementsByClassName('output_8')[1].value=intToHex(vdpCommand,8);
      }

      ,process32XVDP=function(order){
        'use strict';
        let outCode='  ;SEGA 315-5818 32X VDP Register Configuration\n';
        data={
          'output':[]
          ,'reg':[]
        };

        if(order){
          //Process register 4000
          data.output[0]=processBitArray(0,16);
          updateOutput(0,4);
          //Process register 4100
          data.output[1]=(processBitArray(17,14)<<2);
          data.output[1]+=(parseInt(document.getElementsByTagName('select')[1].value));
          updateOutput(1,4);
          //Process register 4102
          data.output[2]=processBitArray(32,16);
          updateOutput(2,4);
          //Process register 4104
          data.output[3]=readHex(49);
          updateOutput(3,4);
          //Process register 4106
          data.output[4]=readHex(51);
          updateOutput(4,4);
          //Process register  4108
          data.output[5]=readHex(53);
          updateOutput(5,4);
          //Process register  410A
          data.output[6]=processBitArray(55,16);
          updateOutput(6,4);

        }else{
          console.log('Processing output, and setting input');
        }

        if(document.getElementsByTagName('input')[72].checked){
          outCode+='  dc.w ';
          data.output.forEach(function(o){
            outCode+='$'+intToHex(o,4)+',';
          });
        }else{
          data.output.forEach(function(o){outCode+='  dc.w $'+intToHex(o,4)+"\n";});
        }
        outCode=outCode.substring(0,outCode.length-1);

        document.getElementsByTagName('textarea')[0].value=outCode;
      }

      ,outTextLabel='<span>Hexadecimal: $</span>'
      ,vdcSelect=document.getElementById('selectVDC')
      ,wrapper=document.getElementById('divWrapper')

      ,checkInput=function(evt){
        'use strict';
        //Check to see if the event was triggered by a field marked as 'output'. Eventually, I'm hoping to use data from output to reverse engineer input code.
        let order=!evt.target.classList.contains('output');

        switch(document.getElementById('selectVDC').value){
          case 'tms9918':
            processTMS9918(order);
            break;
          case 'sega8VDP':
            processSEGA8VDP(order);
            break;
          case 'sega16VDP':
            processSEGA16VDP(order);
            break;
          case 'sega32XVDP':
            process32XVDP(order);
            break;
        }
      }

      ,generateBlock=function(reg){
        'use strict';
        let container=document.getElementById('divContent')
            ,block=document.createElement('div')
            ,header=document.createElement('h4')
            ;

        if(reg.unused){
          block.setAttribute('class','unused');
        }
        header.innerHTML=reg.title+(reg.description===undefined?'':' - '+reg.description);
        block.appendChild(header);


        if(reg.content!==undefined){
          reg.content.forEach(function(c){
            switch(c.type){
              case 'check':
                block.appendChild(generateCheck(c));
                break;
              case 'select':
                block.appendChild(generateSelect(c));
                break;
              case 'text':
                block.appendChild(generateText(c));
                break;
              default: //Undefined. Basically {'desc':'x'}
                block.appendChild(generateCheckUndefined(c));
            }
          });

          if(reg.noOutput===undefined){
            if(reg.title==='Output'){
              block.appendChild(generateOutputTextArea());
            }else{
              block.appendChild(generateOutput(reg));
            }
          }


        }

        if(reg.note!==undefined){
          block.appendChild(generateNote(reg));
        }

        container.appendChild(block);
      }


      ,initLayout=function(){
        'use strict';
        let vdc=vdcSelect.value
            ,container=document.createElement('div')

            ,evt=document.createEvent('Event')
            ,elem //elem needs to be defined *after* all the bits & pieces have been generated

            ,inDiv=document.createElement('div')
            ;

        //Check to see if divContent exists. If so, delete it.
        if(document.getElementById('divContent')){
          document.getElementById('divContent').parentNode.removeChild(document.getElementById('divContent'));
        }

        //Create new divContent
        container.setAttribute('id','divContent');
        document.getElementById('divWrapper').appendChild(container);

        inDiv.innerHTML=chip[vdc].description;
        document.getElementById('divContent').appendChild(inDiv);

        outputSize=(chip[vdc].outputSize===undefined?2:chip[vdc].outputSize);

        chip[vdc].vdpRegs.forEach(function(reg){
          generateBlock(reg);
        });

        document.getElementById('divContent').addEventListener('change',checkInput,false);
        evt.initEvent('change',true,true);
        elem=document.getElementsByTagName('input')[0];
        elem.dispatchEvent(evt);
      }

      ,initApp=function(){
        'use strict';
        vdcSelect.addEventListener('change',initLayout,false);
        initLayout();
      }
      ;