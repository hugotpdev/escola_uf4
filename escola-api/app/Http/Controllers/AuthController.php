<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Contracts\Cache\Store;
use App\Http\Requests\RegisterRequest;
use Illuminate\Container\Attributes\Log;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    function login(LoginRequest $request){
        $validated = $request->validated();
        if(Auth::attempt($validated)) {
            $user = Auth::user();
            $user->tokens()->delete();
            $token = $user->createToken('api-escola')->plainTextToken;
            return response()->json([
                'message' => 'Login successful',
                'data' => [
                    'user' => $user,
                    'token' => $token
                ]
            ],200);
        }else{
            return response()->json([
                'message' => 'Login failed',
                'data' => []
            ],401);
        }

    }
    function register(RegisterRequest $request){
        try{
            $validated = $request->validated();
            $validated['password'] = bcrypt($validated['password']);
            $user=User::create($validated);
            $token = $user->createToken('api-escola')->plainTextToken;
            return response()->json([
                'message' => 'Registration successful',
                'data' => [
                    'user' => $user,
                    'token' => $token
                ]
            ],201);
            }catch(\Exception $e){
                return response()->json([
                    'message' => 'Registration failed',
                    'data' => []
                ],501);
            }
        ;

    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ], 200);
    }

}