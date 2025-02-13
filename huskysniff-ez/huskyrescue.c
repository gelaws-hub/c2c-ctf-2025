#include "out.h"



int _init(EVP_PKEY_CTX *ctx)

{
  int iVar1;
  
  iVar1 = __gmon_start__();
  return iVar1;
}



void FUN_00101080(void)

{
  __cxa_finalize();
  return;
}



// WARNING: Unknown calling convention -- yet parameter storage is locked

int puts(char *__s)

{
  int iVar1;
  
  iVar1 = puts(__s);
  return iVar1;
}



// WARNING: Unknown calling convention -- yet parameter storage is locked

size_t strlen(char *__s)

{
  size_t sVar1;
  
  sVar1 = strlen(__s);
  return sVar1;
}



void __stack_chk_fail(void)

{
                    // WARNING: Subroutine does not return
  __stack_chk_fail();
}



void __printf_chk(void)

{
  __printf_chk();
  return;
}



void __isoc99_scanf(void)

{
  __isoc99_scanf();
  return;
}



undefined8 main(void)

{
  char cVar1;
  int iVar2;
  long lVar3;
  undefined8 uVar4;
  long in_FS_OFFSET;
  undefined local_48 [16];
  undefined local_38 [16];
  long local_20;
  
  local_20 = *(long *)(in_FS_OFFSET + 0x28);
  local_38 = (undefined  [16])0x0;
  local_48 = (undefined  [16])0x0;
  __printf_chk(1,
               "Woof woof! It\'s me, Husky! I\'m stuck in this big, confusing maze, and I really need your help to find my way out. I can move up (1), down (2), left (3), or right (4), but some paths are blocked, and I don\'t want to get lost! Please tell me the right sequence of moves all at once so I can make it to the exit safely. I promise I\'ll be the best boy and listen carefully! I know you won\'t let me down! Enter movement sequence (1=Up, 2=Down, 3=Left, 4=Right): "
              );
  iVar2 = __isoc99_scanf(&DAT_00102320,local_38);
  if (iVar2 == 1) {
    uVar4 = 1;
    iVar2 = move_husky(local_38);
    lVar3 = 0;
    if (iVar2 == 0) {
      puts("Wait... this isn\'t right... I think I\'m lost!");
    }
    else {
      do {
        cVar1 = local_38[lVar3];
        iVar2 = 0x30303030;
        if (cVar1 != '\0') {
          iVar2 = cVar1 * 0x1010101;
        }
        *(int *)(local_48 + lVar3 * 4) = iVar2;
        lVar3 = lVar3 + 1;
      } while (lVar3 != 4);
      uVar4 = 0;
      tea_decrypt(encrypted_flag,local_48);
      tea_decrypt(0x104030,local_48);
      __printf_chk(1,
                   "Yay! You did it! I made it out of the maze, all thanks to you! You\'re the best! As a reward for rescuing me, here\'s something special. Take it and wear it proudly! %s\n"
                   ,encrypted_flag);
    }
  }
  else {
    uVar4 = 1;
    puts(
        "Uh-oh! That doesn\'t look right... I don\'t understand this! Can you give me the moves in the correct format?"
        );
  }
  if (local_20 == *(long *)(in_FS_OFFSET + 0x28)) {
    return uVar4;
  }
                    // WARNING: Subroutine does not return
  __stack_chk_fail();
}



void processEntry _start(undefined8 param_1,undefined8 param_2)

{
  undefined auStack_8 [8];
  
  __libc_start_main(main,param_2,&stack0x00000008,__libc_csu_init,__libc_csu_fini,param_1,auStack_8)
  ;
  do {
                    // WARNING: Do nothing block with infinite loop
  } while( true );
}



// WARNING: Removing unreachable block (ram,0x00101243)
// WARNING: Removing unreachable block (ram,0x0010124f)

void deregister_tm_clones(void)

{
  return;
}



// WARNING: Removing unreachable block (ram,0x00101284)
// WARNING: Removing unreachable block (ram,0x00101290)

void register_tm_clones(void)

{
  return;
}



void __do_global_dtors_aux(void)

{
  if (completed_8061 != '\0') {
    return;
  }
  FUN_00101080(__dso_handle);
  deregister_tm_clones();
  completed_8061 = 1;
  return;
}



void frame_dummy(void)

{
  register_tm_clones();
  return;
}



void tea_decrypt(uint *param_1,int *param_2)

{
  uint uVar1;
  uint uVar2;
  int iVar3;
  
  uVar1 = *param_1;
  uVar2 = param_1[1];
  iVar3 = -0x3910c8e0;
  do {
    uVar2 = uVar2 - (uVar1 * 0x10 + param_2[2] ^ (uVar1 >> 5) + param_2[3] ^ uVar1 + iVar3);
    uVar1 = uVar1 - (uVar2 * 0x10 + *param_2 ^ (uVar2 >> 5) + param_2[1] ^ uVar2 + iVar3);
    iVar3 = iVar3 + 0x61c88647;
  } while (iVar3 != 0);
  *param_1 = uVar1;
  param_1[1] = uVar2;
  return;
}



bool move_husky(char *param_1)

{
  char cVar1;
  size_t sVar2;
  char *pcVar3;
  uint uVar4;
  uint uVar5;
  
  sVar2 = strlen(param_1);
  uVar5 = 0;
  uVar4 = 0;
  pcVar3 = param_1 + sVar2;
  do {
    if (pcVar3 == param_1) {
      return uVar5 == 3 && uVar4 == 3;
    }
    cVar1 = *param_1;
    if (cVar1 == '3') {
      uVar5 = uVar5 - 1;
    }
    else if (cVar1 < '4') {
      if (cVar1 == '1') {
        uVar4 = uVar4 - 1;
      }
      else {
        if (cVar1 != '2') {
          return false;
        }
        uVar4 = uVar4 + 1;
      }
    }
    else {
      if (cVar1 != '4') {
        return false;
      }
      uVar5 = uVar5 + 1;
    }
    if (3 < uVar4) {
      return false;
    }
    if (3 < uVar5) {
      return false;
    }
    param_1 = param_1 + 1;
  } while (*(int *)(maze + ((long)(int)uVar5 + (long)(int)uVar4 * 4) * 4) == 0);
  return false;
}



void __libc_csu_init(EVP_PKEY_CTX *param_1,undefined8 param_2,undefined8 param_3)

{
  long lVar1;
  
  _init(param_1);
  lVar1 = 0;
  do {
    (*(code *)(&__frame_dummy_init_array_entry)[lVar1])((ulong)param_1 & 0xffffffff,param_2,param_3)
    ;
    lVar1 = lVar1 + 1;
  } while (lVar1 != 1);
  return;
}



void __libc_csu_fini(void)

{
  return;
}



void _fini(void)

{
  return;
}



