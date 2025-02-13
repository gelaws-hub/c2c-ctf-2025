extern struct_0 *g_403fe8;

void _init(unsigned long a0)
{
    if (g_403fe8)
        g_403fe8();
    return;
}

extern unsigned long long g_403fa0;
extern unsigned long long g_403fa8;

void sub_401020()
{
    unsigned long long v0; // [sp-0x8]

    v0 = g_403fa0;
    goto g_403fa8;
}

long long sub_401030()
{
    void *v0; // [sp-0x8]

    v0 = 0;
    return (unsigned long long)sub_401020();
}

long long sub_401040()
{
    unsigned long long v0; // [sp-0x8]

    v0 = 1;
    return (unsigned long long)sub_401020();
}

long long sub_401050()
{
    unsigned long long v0; // [sp-0x8]

    v0 = 2;
    return (unsigned long long)sub_401020();
}

long long sub_401060()
{
    unsigned long long v0; // [sp-0x8]

    v0 = 3;
    return (unsigned long long)sub_401020();
}

long long sub_401070()
{
    unsigned long long v0; // [sp-0x8]

    v0 = 4;
    return (unsigned long long)sub_401020();
}

extern unsigned long long encrypted_flag;
extern unsigned long long g_404030;

int main()
{
    int v0;                // [sp-0x48]
    int v1;                // [sp-0x38]
    unsigned int v3;       // eax
    char *v4;              // rax
    unsigned long long v5; // rdx
    unsigned int v6;       // ecx

    *((uint128_t *)&v1) = 0;
    *((uint128_t *)&v0) = 0;
    __printf_chk(1, "Woof woof! It's me, Husky! I'm stuck in this big, confusing maze, and I really need your help to find my way out. I can move up (1), down (2), left (3), or right (4), but some paths are blocked, and I don't want to get lost! Please tell me the right sequence of moves all at once so I can make it to the exit safely. I promise I'll be the best boy and listen carefully! I know you won't let me down! Enter movement sequence (1=Up, 2=Down, 3=Left, 4=Right): ");
    v3 = __isoc99_scanf("%s", &v1);
    if (v3 != 1)
    {
        puts("Uh-oh! That doesn't look right... I don't understand this! Can you give me the moves in the correct format?");
        return 1;
    }
    v4 = 0;
    if (!move_husky(&v1))
    {
        puts("Wait... this isn't right... I think I'm lost!");
        return v3;
    }
    do
    {
        v5 = *((char *)(&v1 + v4));
        v6 = 808464432;
        if ((char)v5)
            v6 = (unsigned int)v5 * 16843009;
    } while ((*((unsigned int *)((char *)&v0 + 0x4 * (unsigned long long)v4)) = v6, v4 + 1 != 4));
    tea_decrypt(&encrypted_flag, &v0);
    tea_decrypt(&g_404030, &v0);
    __printf_chk(1, "Yay! You did it! I made it out of the maze, all thanks to you! You're the best! As a reward for rescuing me, here's something special. Take it and wear it proudly! %s\n", &encrypted_flag);
    return 0;
}

long long _start(unsigned long a0, unsigned long a1, unsigned long long a2)
{
    unsigned long v0; // [sp+0x0], Other Possible Types: unsigned long long
    unsigned long v1; // [bp+0x8]
    unsigned long v2; // rax

    v0 = v2;
    __libc_start_main(main, v0, &v1, __libc_csu_init, __libc_csu_fini, a2, &v0); /* do not return */
}

long long sub_40122e()
{
    [D] Unsupported jumpkind Ijk_SigTRAP at address 4198958()
}

extern unsigned long long g_403fd8;

void deregister_tm_clones()
{
    return;
}

extern unsigned long long g_403ff0;

void register_tm_clones()
{
    return;
}

extern char __TMC_END__;
extern unsigned long long g_403ff8;

long long __do_global_dtors_aux()
{
    unsigned long v0;      // [sp-0x8]
    unsigned long v3;      // rax
    unsigned long long v4; // rax

    if (__TMC_END__)
        return v3;
    *((int *)&v0) = vvar_7{reg 56};
    if (!g_403ff8)
    {
        v4 = (unsigned long long)deregister_tm_clones();
        __TMC_END__ = 1;
        return v4;
    }
    __cxa_finalize();
}

long long frame_dummy()
{
    return (unsigned long long)register_tm_clones();
}

void tea_decrypt(unsigned int a0[2], unsigned long a1)
{
    unsigned int v1; // esi
    unsigned int v3; // ecx
    unsigned int v4; // edx

    v1 = 3337565984;
    do
    {
        v1 += 1640531527;
    } while (v1 + 1640531527);
    a0[0] = v3;
    a0[1] = v4;
    return;
}

extern unsigned int maze[4];

int move_husky(char *a0)
{
    unsigned long long v1; // rax
    unsigned int v2;       // esi
    unsigned int v3;       // ecx
    char *v4;              // 4096
    char *v5;              // rdi
    unsigned long long v6; // rdx
    char v7;               // dl

    v1 = strlen(a0);
    v2 = 0;
    v3 = 0;
    v4 = a0;
    do
    {
        v5 = v4;
        if (&a0[v1] == v5)
            return v2 == 3 & (unsigned int)(v6 & 0xffffffffffffff00 | v3 == 3);
        v7 = *(v5);
        if (v7 == 51)
        {
            v2 -= 1;
        }
        else if (v7 > 51)
        {
            if (v7 != 52)
                return 0;
            v2 += 1;
        }
        else if (v7 == 49)
        {
            v3 -= 1;
        }
        else if (v7 == 50)
        {
            v3 += 1;
        }
        else
        {
            return 0;
        }
    } while (v3 <= 3 && v2 <= 3 && (v4 = v5 + 1, !(unsigned int)(unsigned long long)maze[4 * v3 + v2]));
    return 0;
}

extern struct_1 __init_array_start;

long long __libc_csu_init(unsigned int a0, unsigned long long a1, unsigned long long a2)
{
    unsigned long long v1; // rax
    void *v2;              // rbx

    v1 = (unsigned long long)_init(a0);
    v2 = 0;
    do
    {
    } while (v2 + 1 != 1);
    return *((long long *)((char *)&__init_array_start.field_0 + 0x8 * v2))(a0, a1, a2);
}

long long __libc_csu_fini()
{
    unsigned long v1; // rax

    return v1;
}

long long _fini()
{
    unsigned long v1; // rax

    return v1;
}
